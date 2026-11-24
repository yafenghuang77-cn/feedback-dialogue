import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";

const LoginPages = () => {
  useLoad(() => {
    console.log("Page loaded.");
  });
  return (
    <View>
      <Text>登陆</Text>
    </View>
  );
};

export default LoginPages;
