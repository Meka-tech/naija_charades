import * as Haptics from 'expo-haptics';

// Fire-and-forget wrappers; haptics must never break gameplay.
const safe = (p: Promise<unknown>) => p.catch(() => {});

export const haptics = {
  tap: () => safe(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  press: () => safe(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
  select: () => safe(Haptics.selectionAsync()),
  success: () =>
    safe(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  warning: () =>
    safe(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
  error: () =>
    safe(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
};
