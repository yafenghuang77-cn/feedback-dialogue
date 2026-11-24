import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";

const HomePages = () => {
  useLoad(() => {
    console.log("Page loaded.");
  });
  return (
    <View>
      <Text>首页</Text>
    </View>
  );
};

export default HomePages;
