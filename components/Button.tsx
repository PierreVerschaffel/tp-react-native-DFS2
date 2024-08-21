import { Pressable, StyleSheet, Text, useColorScheme, Image } from "react-native";
import { primary } from '@/constants/Colors';

declare type Props = {
    title: string,
    width: number,
    icon?: string,
    onPress?: () => void
};

export default function Button({ title, width, onPress, icon }: Props) {

    return <Pressable
        onPress={onPress}
        style={{
            ...styles.button,
            width,
            backgroundColor: primary
        }}>
        {icon ? <Image source={{ uri: icon }} style={styles.icon} /> : <Text style={styles.textButton}>{title}</Text>}
    </Pressable>
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        padding: 5,

    },
    icon: {
        width: 20,
        height: 20
    },
    textButton: {
        width: '100%',
        textAlign: 'center',
        color: 'white'
    }
})