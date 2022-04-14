import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { removeLog } from "../../Firebase/AUD";


const LogCard = ({
  time = "Bug",
  title = "Bug",
  content = "Bug",
  uid = "",
}) => {
  return (
    <View style={styles.logContainer}>
      <View>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.content}>
            {content}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Icon name="delete-outline" size={30} color="#29ABE2" onPress={() => removeLog(uid)}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logContainer: {
    backgroundColor: "#F1F9FD",
    padding: 20,
    borderRadius: 20,
    width: "82%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  time: {
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    width: "92.5%",
  },
  content: {
    fontSize: 14,
  },
});
export default LogCard;
