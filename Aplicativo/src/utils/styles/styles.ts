import {StyleSheet} from 'react-native';

export const s = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 20,
        gap: 20,
    },

    titleBox: {
        width: '100%',
        paddingHorizontal: 20
    },

    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 22
    },

    subtitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22
    },

    text: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 17
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },

    navbar: {
        zIndex: 1,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        borderBottomWidth: 2,
        borderColor: '#bfbfbf',
        backgroundColor: '#f4f4f4'
    },

    profileBox: {
        backgroundColor: '#c4c4c4',
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    profileIcon: {

    },

    headerCont: {
        elevation: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#f4f4f4',
        padding: 20,
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },

    nextDatesCont: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 15,
        width: 200,
        gap: 10,
        padding: 10
    },

    card: {
        width: 250,
        backgroundColor: '#f4f4f4',
        elevation: 5,
        margin: 10,
        borderRadius: 10,
        padding: 15,
        gap: 10
    },

    gradientBorder: {
        padding: 3, 
        borderRadius: 12,
        width: '100%', 
      },
      insideViewGradient: {
        backgroundColor: "#fff",
        borderRadius: 10, 
        padding: 10,
        width: '100%'
      },
    image: {
        width: 150,
        height: 100
    },
})