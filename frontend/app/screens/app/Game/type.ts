import {RouteProp} from '@react-navigation/core';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IRootNavgation} from '../../navigation';
import {AuthNavgationParams} from '../../navigation/auth';

export type IAuthNav = CompositeNavigationProp<
  NativeStackNavigationProp<IRootNavgation>,
  NativeStackNavigationProp<AuthNavgationParams>
>;
export type IAuthRoute = RouteProp<AuthNavgationParams>;
