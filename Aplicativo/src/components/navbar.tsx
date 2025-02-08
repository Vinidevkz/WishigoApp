import { TouchableOpacity, View, Text, StatusBar, Dimensions, Platform} from 'react-native'

import {Feather, FontAwesome5, Entypo} from "@expo/vector-icons"

import {s} from '../utils/styles/styles'

const iconLibraries = {
    Feather,
    FontAwesome5,
    Entypo
}

interface NavBarProps{
    icon1?: string;
    iconLibName1?: "Feather" | "FontAwesome5" | "Entypo",
    icon2?: string;
    iconLibName2?: "Feather" | "FontAwesome5" | "Entypo",
    title?: string;
    userName?: string
}

const NavBar: React.FC<NavBarProps> = ({icon1, icon2, iconLibName1, iconLibName2,  title, userName }) => {

    const IconComponent1 = iconLibName1 ? iconLibraries[iconLibName1] : null
    const IconComponent2 = iconLibName2 ? iconLibraries[iconLibName2] : null

    return (
        <View style={[s.navbar, {marginTop: StatusBar.currentHeight}]}>

            {IconComponent1 && icon1 && (
                    <TouchableOpacity>
                        <IconComponent1 style={s.profileIcon} name={icon1} size={30} color="black" />
                    </TouchableOpacity>
            )}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[s.subtitle, {fontSize: 18}]} numberOfLines={1}>{title}</Text>
                <Text style={[s.subtitle, {fontSize: 18}]} numberOfLines={1}>{userName}</Text>
            </View>
            {IconComponent2 && icon2 && (
                    <TouchableOpacity>
                        <IconComponent2 style={s.profileIcon} name={icon2} size={24} color="black" />
                    </TouchableOpacity>
            )}

            <TouchableOpacity>
                <View style={s.profileBox}>
                    <Text style={s.subtitle}>V</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default NavBar