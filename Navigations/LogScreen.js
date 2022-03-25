import { ScrollView, View } from "react-native";
import DeleteButton from "./Elements/DeleteButton";
import LogCard from "./Elements/LogCard";
import THTypo from "./Elements/TopHeadTypo";

const LogScreen = () => {
    return <View style={{ flex: 1 }}>
        <View style={{ marginTop: "10%", marginBottom: 20 }}>
            <THTypo smalltext="Personal" largetext="Log"></THTypo>
        </View>
        <ScrollView>
            <LogCard />
            <LogCard />
            <LogCard />
            <LogCard />
            <LogCard />
            <LogCard />
            <LogCard />
            <LogCard />
        </ScrollView>
        <DeleteButton text="Clear Log" type="dark"></DeleteButton>
    </View >
}


export default LogScreen;

