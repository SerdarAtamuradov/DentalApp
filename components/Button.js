import React from "react";
import styled from "styled-components/native";

const Button = ({ children, color, onPress }) => (
  <ButtonWrapper onPress={onPress} color={color}>
    <ButtonText>{children}</ButtonText>
  </ButtonWrapper>
);

Button.defaultProps = {
  color: "#2A86FF",
};

const ButtonWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${(props) => props.color};
  height: 45px;
  padding: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export default Button;
