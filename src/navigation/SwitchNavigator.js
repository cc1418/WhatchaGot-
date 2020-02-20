
import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login1 from '../screens/Login1'
import Signup1 from '../screens/Signup1'
import Profile from '../screens/Profile'

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login1
        },
        Signup: {
            screen: Signup1
        },
        Profile: {
            screen: Profile
        }
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)