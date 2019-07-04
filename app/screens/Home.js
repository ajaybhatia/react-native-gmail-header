import React from "react";
import { Animated } from "react-native";
import styled from "styled-components";

const HEIGHT = 54;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView``;

const Box = styled.View`
  height: 200px;
  background-color: ${props => props.bgColor};
  margin: 5px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  elevation: 5;
  box-shadow: 10px 5px 5px #000;
  padding-top: 40px;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const SearchBarWrapper = styled.View`
  border-width: 0.2px;
  border-color: #777;
  margin: 5px 15px;
  border-radius: 10px;
  position: absolute;
  flex-direction: row;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: white;
  elevation: 3;
`;

const SearchBar = styled.TextInput`
  flex: 1;
  padding: 10px;
  font-size: 18px;
`;

const MenuIcon = styled.Text`
  margin-left: 20px;
  font-size: 18px;
  color: #333;
`;

const ProfileImageWrapper = styled.View`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-width: 0.1px;
  border-color: #777;
`;

const ProfileImage = styled.Image`
  flex: 1;
  height: 32px;
  width: 32px;
  border-radius: 16px;
`;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedSearchBarWrapper = Animated.createAnimatedComponent(
  SearchBarWrapper
);

function randomColor() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

function Home() {
  let scrollY = new Animated.Value(0);

  return (
    <Container>
      <AnimatedScrollView
        contentContainerStyle={{ paddingTop: HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true
          }
        )}
      >
        {[...Array(20).keys()].map((_, index) => (
          <Box key={index} bgColor={randomColor}>
            <Title>Box {index + 1}</Title>
          </Box>
        ))}
      </AnimatedScrollView>
      <AnimatedSearchBarWrapper
        style={{
          transform: [
            {
              translateY: Animated.diffClamp(
                scrollY,
                -10, // marginTop
                HEIGHT // Header height
              ).interpolate({
                inputRange: [0, HEIGHT],
                outputRange: [0, -HEIGHT],
                extrapolate: "clamp"
              })
            }
          ]
        }}
      >
        <MenuIcon>&#9776;</MenuIcon>
        <SearchBar placeholder="Search Box" />
        <ProfileImageWrapper>
          <ProfileImage
            source={require("../assets/images/ab_photography.jpg")}
          />
        </ProfileImageWrapper>
      </AnimatedSearchBarWrapper>
    </Container>
  );
}

export default Home;
