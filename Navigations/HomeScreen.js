import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopHeadTypo from "./Elements/TopHeadTypo";
import IOTButton from "./Elements/IOTButton";
import Credit from "./Elements/Credit";
import { handleSignOut, auth } from "../Firebase/utility";


export default function WCScreen() {
    const navigation = useNavigation();
    const returnLogin = () => {
        handleSignOut(() => navigation.replace("Login"))
    } 

    return (
        <View style={{ height: "100%" }}>
            <Image
                style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10%",
                marginBottom: "20%",
                height: "35%",
                resizeMode: "contain",
                }}
                source={require("../assets/livingroom.png")}
            />
            <View style={{ marginTop: "10%" }}>
                <TopHeadTypo
                smalltext={"Hello. This is CESI."}
                largetext={auth.currentUser?.email}
                />
            </View>

            <IOTButton text="Sign Out" onPress={returnLogin} />

        <Credit />
        </View>
    );
}
