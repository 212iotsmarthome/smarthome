import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";


const LogCard = ({
    time = "00:00",
    date = "15-01-2001",
    content = "LED Phong khach 1",
    action = "tatasdasdhabasfhjkbgaksfbskjhgashjfvbaskfhjvafhasvfjsakvjkdassssssssssssssssssasfgasdjkhsakjhfskjdskjfhsdkfjhsakfhkjfhdskfjhslk" }) => {
    return <View style={styles.logContainer} >
        <View >
            <Text style={styles.time}>{time + " " + date}</Text>
            <Text style={styles.title}>{content}</Text>
            <View style={styles.contentContainer}>
                <Text numberOfLines={2} style={styles.content}>{action}</Text>
            </View>
        </View>
        <View >
            <TouchableOpacity>
                <Icon name="delete-outline" size={30} color="#29ABE2">
                </Icon>
            </TouchableOpacity>
        </View>
    </View>
}
const styles = StyleSheet.create({
    logContainer: {
        backgroundColor: '#F1F9FD',
        padding: 20,
        borderRadius: 20,
        width: "82%",
        marginLeft: "auto",
        marginRight: "auto",
        marginVertical: 5,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    time: {
        fontSize: 12,
        fontWeight: "600"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    contentContainer: {
        width: "95%",
    },
    content: {
        fontSize: 14,
    }
})
export default LogCard;