import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { removeLog } from "../../Firebase/AUD";

const formatDate = (date) => {
  let text = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  text +=
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    " GMT" +
    (date.getTimezoneOffset() > 0 ? "-" : "+") +
    Math.abs(date.getTimezoneOffset() / 60);

  return text;
};

const LogCard = ({
  time = "Bug",
  title = "Bug",
  content = "Bug",
  uid = "",
}) => {
  return (
    <View style={styles.logContainer}>
      <View style={{ width: "90%" }}>
        <Text style={styles.time}>{formatDate(time.toDate())}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.content}>
            {content}
          </Text>
        </View>
      </View>
      <View>
        {/* <TouchableOpacity>
          <Icon
            name="delete-outline"
            size={30}
            color="#29ABE2"
            onPress={() => removeLog(uid)}
          ></Icon>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logContainer: {
    backgroundColor: "#F1F9FD",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 20,
    width: "82%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
