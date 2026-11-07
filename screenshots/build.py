"""Builds App Store / Play Store marketing images for Naija Charades.

Renders HTML templates to exact pixel sizes with headless Chrome.
Run:  python3 screenshots/build.py   (from the repo root)
Inputs: screenshots/raw/*.png (simulator captures, 1206x2622)
"""
import os, subprocess, pathlib, html

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parent
RAW = ROOT / "raw"
OUT = ROOT / "store"
TMP = ROOT / ".build"
FONTS = REPO / "frontend/assets/fonts"
LOGO = REPO / "frontend/assets/images/logo.svg"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

GOLD, INK, PINK, PINK_DEEP, WHITE = "#FEB60A", "#1A1919", "#F4839B", "#E5607D", "#FFFFFF"

FONT_CSS = f"""
@font-face {{ font-family: Gagalin; src: url('file://{FONTS}/Gagalin-Regular.otf'); }}
@font-face {{ font-family: MBlack; src: url('file://{FONTS}/Montserrat-Black.ttf'); }}
@font-face {{ font-family: MXBold; src: url('file://{FONTS}/Montserrat-ExtraBold.ttf'); }}
@font-face {{ font-family: MBold; src: url('file://{FONTS}/Montserrat-Bold.ttf'); }}
* {{ margin:0; padding:0; box-sizing:border-box; }}
html, body {{ width:100%; height:100%; overflow:hidden; }}
"""


def render(name, w, h, body, css=""):
    TMP.mkdir(exist_ok=True)
    out = OUT / name
    out.parent.mkdir(parents=True, exist_ok=True)
    page = TMP / (name.replace("/", "__") + ".html")
    page.write_text(f"<!doctype html><html><head><meta charset='utf-8'><style>{FONT_CSS}{css}</style></head>"
                    f"<body>{body}</body></html>", encoding="utf-8")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    "--force-device-scale-factor=1", "--virtual-time-budget=4000", f"--window-size={w},{h}",
                    f"--screenshot={out}", f"file://{page}"], check=True, capture_output=True)
    # Strip alpha so App Store Connect accepts the file (JPEG has no alpha channel).
    jpg = out.with_suffix(".jpg")
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "100" if (w, h) == (5244, 2950) else "95",
                    str(out), "--out", str(jpg)], check=True, capture_output=True)
    out.unlink()
    if (w, h) == (5244, 2950):
        # Apple accepts the 16:9 "universal" header/search image only as PNG.
        subprocess.run(["sips", "-s", "format", "png", str(jpg), "--out", str(out)], check=True, capture_output=True)
        jpg.unlink()
        print("wrote", out.relative_to(REPO), f"{w}x{h}")
        return
    print("wrote", jpg.relative_to(REPO), f"{w}x{h}")


# ---------------------------------------------------------------- in-game card frame
# The simulator has no accelerometer, so the live card can't be captured; this rebuilds the
# round screen from round.tsx (palette.pink bg, white glow, Montserrat Black card, timer pill).
def build_round_frame(word="FUNKE AKINDELE", score=7, timer="00:41"):
    w, h = 2622, 1206
    body = f"""
<div class=s>
  <div class=glow></div>
  <div class=exit><svg viewBox='0 0 24 24' width=60 height=60><path d='M15 6l-6 6 6 6' stroke='white' stroke-width='2.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg></div>
  <div class=title>NOLLYWOOD</div>
  <div class=score><svg viewBox='0 0 24 24' width=46 height=46><path fill='{GOLD}' d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z'/></svg>{score}</div>
  <div class=island></div>
  <div class=word>{html.escape(word)}</div>
  <div class='hint l'>&#8593; Tilt up · Pass</div>
  <div class=timer><svg viewBox='0 0 24 24' width=50 height=50><circle cx=12 cy=12 r=9 stroke='{INK}' stroke-width=2 fill=none /><path d='M12 7v5l3 2' stroke='{INK}' stroke-width=2 fill=none stroke-linecap=round /></svg>{timer}</div>
  <div class='hint r'>Correct · Tilt down &#8595;</div>
</div>"""
    css = f"""
.s {{ position:relative; width:{w}px; height:{h}px; background:{PINK}; overflow:hidden; font-family:MBold; }}
.glow {{ position:absolute; width:1520px; height:1520px; border-radius:50%; background:rgba(255,255,255,.10); left:50%; top:50%; transform:translate(-50%,-50%); }}
.exit {{ position:absolute; left:117px; top:57px; width:126px; height:126px; border-radius:50%; background:rgba(255,255,255,.22); display:flex; align-items:center; justify-content:center; }}
.title {{ position:absolute; top:84px; left:0; right:0; text-align:center; font-family:Gagalin; font-size:74px; color:white; letter-spacing:1px; }}
.score {{ position:absolute; right:250px; top:57px; height:104px; padding:0 40px; border-radius:60px; background:rgba(0,0,0,.14); color:white; font-family:MBlack; font-size:56px; display:flex; gap:16px; align-items:center; }}
.island {{ position:absolute; right:40px; top:415px; width:110px; height:376px; border-radius:60px; background:#000; }}
.word {{ position:absolute; left:250px; right:250px; top:50%; transform:translateY(-55%); text-align:center; color:white; font-family:MBlack; font-size:190px; line-height:1.05; text-shadow:0 9px 24px rgba(0,0,0,.18); }}
.hint {{ position:absolute; bottom:110px; color:rgba(255,255,255,.92); font-size:46px; }}
.hint.l {{ left:312px; }} .hint.r {{ right:340px; }}
.timer {{ position:absolute; bottom:78px; left:50%; transform:translateX(-50%); height:122px; padding:0 54px; border-radius:70px; background:white; color:{INK}; font-family:MBlack; font-size:66px; display:flex; gap:22px; align-items:center; }}
"""
    TMP.mkdir(exist_ok=True)
    page = TMP / "round.html"
    page.write_text(f"<!doctype html><html><head><meta charset='utf-8'><style>{FONT_CSS}{css}</style></head><body>{body}</body></html>")
    out = RAW / "09-round-card.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    "--force-device-scale-factor=1", "--virtual-time-budget=3000", f"--window-size={w},{h}",
                    f"--screenshot={out}", f"file://{page}"], check=True, capture_output=True)
    return out


def build_forehead_frame():
    """Rebuilds the 'Place on forehead' start screen (landscape) as seen in the simulator."""
    w, h = 2622, 1206
    body = f"""<div class=s>
  <div class=exit><svg viewBox='0 0 24 24' width=60 height=60><path d='M15 6l-6 6 6 6' stroke='white' stroke-width='2.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg></div>
  <div class=island></div>
  <div class=mid>
    <svg viewBox='0 0 24 24' width=170 height=170><rect x=3 y=7 width=18 height=10 rx=2.2 stroke='white' stroke-width=1.1 fill=none /><path d='M19 10.5v3' stroke='white' stroke-width=1.1 stroke-linecap=round /></svg>
    <div class=t>PLACE ON FOREHEAD</div>
  </div>
  <div class=pill>Tap anywhere to start</div>
</div>"""
    css = f"""
.s {{ position:relative; width:{w}px; height:{h}px; background:{PINK_DEEP}; overflow:hidden; }}
.exit {{ position:absolute; left:117px; bottom:57px; width:126px; height:126px; border-radius:50%; background:rgba(255,255,255,.22); display:flex; align-items:center; justify-content:center; transform:rotate(-90deg); }}
.island {{ position:absolute; right:40px; top:415px; width:110px; height:376px; border-radius:60px; background:#000; }}
.mid {{ position:absolute; left:0; right:0; top:42%; transform:translateY(-50%); display:flex; align-items:center; justify-content:center; gap:70px; }}
.t {{ font-family:Gagalin; font-size:190px; color:white; letter-spacing:4px; }}
.pill {{ position:absolute; left:50%; top:67%; transform:translateX(-50%); background:white; color:{PINK_DEEP}; font-family:MXBold; font-size:66px; padding:42px 80px; border-radius:90px; }}
"""
    TMP.mkdir(exist_ok=True)
    page = TMP / "forehead.html"
    page.write_text(f"<!doctype html><html><head><meta charset='utf-8'><style>{FONT_CSS}{css}</style></head><body>{body}</body></html>")
    out = RAW / "06-forehead-land.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    "--force-device-scale-factor=1", "--virtual-time-budget=3000", f"--window-size={w},{h}",
                    f"--screenshot={out}", f"file://{page}"], check=True, capture_output=True)


# ---------------------------------------------------------------- device frames
def phone(img, width_css, landscape=False, extra_style=""):
    """CSS iPhone frame around a screenshot. width_css is the outer width."""
    ratio = "1206 / 2622" if not landscape else "2622 / 1206"
    return (f"<div class='phone{' land' if landscape else ''}' style='width:{width_css}; aspect-ratio:{ratio}; {extra_style}'>"
            f"<div class=btn1></div><div class=btn2></div><div class=btn3></div>"
            f"<img src='file://{img}'></div>")


PHONE_CSS = """
.phone { position:relative; background:#0d0d0d; border-radius:15.5% / 7.2%; padding:3.1%;
  box-shadow: 0 0 0 0.45cqw #2b2b2b inset, 0 4cqw 8cqw rgba(0,0,0,.28), 0 1.2cqw 2.5cqw rgba(0,0,0,.25); }
.phone img { width:100%; height:100%; display:block; border-radius:13.2% / 6.1%; }
.phone.land { border-radius:7.2% / 15.5%; }
.phone.land img { border-radius:6.1% / 13.2%; }
.phone .btn1, .phone .btn2, .phone .btn3 { position:absolute; background:#1c1c1c; border-radius:2px; }
.phone .btn1 { left:-0.9%; top:17%; width:1%; height:4%; }
.phone .btn2 { left:-0.9%; top:24%; width:1%; height:7%; }
.phone .btn3 { right:-0.9%; top:26%; width:1%; height:10%; }
.phone.land .btn1 { top:-0.9%; left:17%; height:1%; width:4%; }
.phone.land .btn2 { top:-0.9%; left:24%; height:1%; width:7%; }
.phone.land .btn3 { bottom:-0.9%; right:26%; top:auto; height:1%; width:10%; }
"""

# ---------------------------------------------------------------- portrait screenshots
SHOTS = [
    # slug, verb, descriptor, screen, layout, extras
    ("01-play", "PLAY", "CHARADES, NAIJA STYLE", "09-round-card.png", "land", "tilt"),
    ("02-pick", "PICK", "FROM 17 FUN CATEGORIES", "03-categories-naija.png", "port", None),
    ("03-guess", "GUESS", "1,800+ NAIJA CARDS", "04-nollywood.png", "port", "chips"),
    ("04-battle", "BATTLE", "YOUR FRIENDS IN VERSUS", "08-versus.png", "port", None),
    ("05-hold", "HOLD", "IT UP TO YOUR FOREHEAD", "06-forehead-land.png", "land", "squad"),
    ("06-new", "TRY", "NEW NAIJA SLANG & PLACES PACKS", "02-categories.png", "port", "newtag"),
]

CHIPS = [("Funke Akindele", "#F3859C", -6, "6%", "71%"), ("Jollof Rice", "#E0A100", 5, "58%", "75%"),
         ("Japa", "#1FA463", 4, "14%", "82%"), ("Burna Boy", "#588CB5", -4, "52%", "86%")]


def portrait(slug, verb, desc, screen, layout, extra, w, h, folder, phone_w=None):
    img = RAW / screen
    aspect = h / w
    tall = aspect > 2.0  # App Store (≈2.17) vs Play (1.78)
    head_top = "7.5cqw" if tall else "5.5cqw"
    pw = phone_w or ("80cqw" if tall else "64cqw")
    if layout == "land":
        dev = f"<div class=devland>{phone(img, '124cqw', landscape=True)}</div>"
    else:
        dev = f"<div class=dev>{phone(img, pw)}</div>"
    deco = ""
    if extra == "tilt":
        deco = ("<div class=tilts><div class='tchip ok'>&#8595;&nbsp; TILT DOWN · CORRECT</div>"
                "<div class='tchip pass'>&#8593;&nbsp; TILT UP · PASS</div></div>")
    if extra == "squad":
        deco = ("<div class=tilts><div class='tchip ok'>YOU GUESS THE WORD</div>"
                "<div class='tchip pass'>YOUR SQUAD ACTS IT OUT</div></div>")
    if extra == "chips":
        deco = "".join(f"<div class=chip style='background:{c}; transform:rotate({r}deg); left:{x}; top:{y};'>{html.escape(t)}</div>"
                       for t, c, r, x, y in CHIPS)
    if extra == "newtag":
        deco = "<div class=newtag>NEW!</div>"
    body = f"""<div class=c>
  <div class=head><div class=verb>{verb}</div><div class=desc>{desc}</div></div>
  {dev}{deco}
</div>"""
    css = PHONE_CSS + f"""
.c {{ position:relative; width:{w}px; height:{h}px; background:{GOLD}; overflow:hidden; container-type:inline-size; }}
.head {{ position:absolute; top:{head_top}; left:10cqw; right:10cqw; text-align:center; z-index:3; }}
.verb {{ font-family:Gagalin; font-size:{'21cqw' if tall else '17cqw'}; line-height:.95; color:white; letter-spacing:.4cqw;
  text-shadow: .9cqw .9cqw 0 {INK}; -webkit-text-stroke: .25cqw {INK}; }}
.desc {{ margin-top:2.2cqw; font-family:MBlack; font-size:{'6.6cqw' if tall else '5.4cqw'}; line-height:1.12; color:{INK}; letter-spacing:.1cqw; }}
.dev {{ position:absolute; left:50%; transform:translateX(-50%); top:{'52cqw' if tall else '40cqw'}; z-index:1; }}
.devland {{ position:absolute; left:50%; top:{'54%' if tall else '57%'}; transform:translate(-50%,-50%) rotate(-7deg); z-index:1; }}
.tilts {{ position:absolute; left:0; right:0; bottom:{'22cqw' if tall else '6cqw'}; display:flex; flex-direction:column; align-items:center; gap:3cqw; z-index:2; }}
.tchip {{ font-family:MBlack; font-size:4.6cqw; padding:2.6cqw 5cqw; border-radius:10cqw; color:white; box-shadow:0 1.4cqw 3cqw rgba(0,0,0,.2); }}
.tchip.ok {{ background:#1FA463; transform:rotate(-3deg); }} .tchip.pass {{ background:{INK}; transform:rotate(2deg); }}
.chip {{ position:absolute; z-index:2; font-family:MBlack; font-size:{'4.7cqw' if tall else '4cqw'}; color:white; padding:2.4cqw 4.2cqw; border-radius:3cqw;
  border:.7cqw solid white; box-shadow:0 1.6cqw 3.2cqw rgba(0,0,0,.25); text-shadow:0 .3cqw .8cqw rgba(0,0,0,.25); white-space:nowrap; }}
.newtag {{ position:absolute; z-index:2; right:5cqw; top:{'49cqw' if tall else '37cqw'}; font-family:Gagalin; font-size:9cqw; color:white; background:#1FA463;
  padding:1.6cqw 4.4cqw; border-radius:3cqw; transform:rotate(9deg); border:.8cqw solid white; box-shadow:0 1.6cqw 3.2cqw rgba(0,0,0,.25); }}
"""
    render(f"{folder}/{slug}.png", w, h, body, css)


# ---------------------------------------------------------------- wide banners
def banner(name, w, h, headline="THE NAIJA PARTY GAME", sub="1,800+ cards · 17 categories<br>Play with your squad"):
    r = w / h
    # three phones, gameplay landscape in front
    body = f"""<div class=c>
  <div class=left>
    <img class=logo src='file://{LOGO}'>
    <div class=hl>{headline}</div>
    <div class=sub>{sub}</div>
  </div>
  <div class=right>
    <div class='p p1'>{phone(RAW/'02-categories.png', '100%')}</div>
    <div class='p p2'>{phone(RAW/'04-nollywood.png', '100%')}</div>
    <div class='p p3'>{phone(RAW/'09-round-card.png', '100%', landscape=True)}</div>
  </div>
</div>"""
    # sizes in container-height units so every aspect ratio stays balanced
    css = PHONE_CSS + f"""
.c {{ position:relative; width:{w}px; height:{h}px; background:{GOLD}; overflow:hidden; container-type:size; }}
.left {{ position:absolute; left:{'7cqw' if r > 2 else '6cqw'}; top:50%; transform:translateY(-50%); width:{'40cqw' if r > 2 else '44cqw'}; z-index:3; }}
.logo {{ width:100%; display:block; filter: drop-shadow(.5cqh .5cqh 0 {INK}); }}
.hl {{ margin-top:5cqh; font-family:Gagalin; font-size:{'11cqh' if r > 2 else '8.6cqh'}; line-height:1; color:white; -webkit-text-stroke:.25cqh {INK}; text-shadow:.7cqh .7cqh 0 {INK}; }}
.sub {{ margin-top:3.4cqh; font-family:MBlack; font-size:{'4.6cqh' if r > 2 else '3.5cqh'}; color:{INK}; }}
.right {{ position:absolute; right:0; top:0; bottom:0; width:{'50cqw' if r > 2 else '50cqw'}; }}
.p {{ position:absolute; }}
.p1 {{ height:auto; width:{'26cqh' if r > 2 else '30cqh'}; left:{'4%' if r > 2 else '2%'}; top:{'14cqh' if r > 2 else '17cqh'}; transform:rotate(-8deg); }}
.p2 {{ width:{'26cqh' if r > 2 else '30cqh'}; right:{'8%' if r > 2 else '6%'}; top:{'8cqh' if r > 2 else '9cqh'}; transform:rotate(7deg); }}
.p3 {{ width:{'72cqh' if r > 2 else '70cqh'}; left:50%; bottom:{'3cqh' if r > 2 else '6cqh'}; transform:translateX(-50%) rotate(-3deg); z-index:2; }}
.p .phone {{ box-shadow: 0 0 0 0.3cqh #2b2b2b inset, 0 3cqh 6cqh rgba(0,0,0,.3); }}
"""
    render(name, w, h, body, css)


def feature_graphic(w=1024, h=500):
    body = f"""<div class=c>
  <div class=left><img class=logo src='file://{LOGO}'><div class=hl>THE NAIJA PARTY GAME</div></div>
  <div class=p3>{phone(RAW/'09-round-card.png', '100%', landscape=True)}</div>
</div>"""
    css = PHONE_CSS + f"""
.c {{ position:relative; width:{w}px; height:{h}px; background:{GOLD}; overflow:hidden; container-type:size; }}
.left {{ position:absolute; left:6cqw; top:50%; transform:translateY(-50%); width:42cqw; }}
.logo {{ width:100%; filter: drop-shadow(3px 3px 0 {INK}); }}
.hl {{ margin-top:5cqh; font-family:Gagalin; font-size:10cqh; color:white; line-height:1; -webkit-text-stroke:1.2px {INK}; text-shadow:4px 4px 0 {INK}; }}
.p3 {{ position:absolute; width:62cqw; right:-12cqw; top:50%; transform:translateY(-50%) rotate(-6deg); }}
"""
    render("playstore/feature-graphic-1024x500.png", w, h, body, css)


if __name__ == "__main__":
    build_round_frame()
    build_forehead_frame()
    for s in SHOTS:
        portrait(*s, 1206, 2622, "appstore/iphone-1206x2622")
        portrait(*s, 1179, 2556, "appstore/iphone-1179x2556")
        portrait(*s, 1080, 1920, "playstore/phone-1080x1920")
    banner("appstore/header-5244x2950.png", 5244, 2950)
    banner("appstore/header-3840x1646.png", 3840, 1646)
    banner("appstore/search-5244x2950.png", 5244, 2950, "ACT IT. GUESS IT. LAUGH.")
    banner("appstore/search-3840x2560.png", 3840, 2560, "ACT IT. GUESS IT. LAUGH.")
    banner("appstore/search-1920x1280.png", 1920, 1280, "ACT IT. GUESS IT. LAUGH.")
    feature_graphic()
