import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default class ModalView extends Component {
  state = {
    productId: null,
    productName: null,
    productQuantity: null,
    productPrice: null
  };

  //Talks to the Main View And push the product object
  addToProductList = () => {
    if (
      this.state.productName &&
      this.state.productQuantity &&
      this.state.productPrice
    ) {
      ToastAndroid.show("added", ToastAndroid.LONG);
      let product = {
        productId: toString(Math.floor(Math.random * 100 - Math.random * 11)),
        productName: this.state.productName,
        productQuantity: this.state.productQuantity,
        productPrice: this.state.productPrice
      };
      this.props.addData(product);
      // on press clearing textInput
      this.setState({
        productId: null,
        productName: null,
        productQuantity: null,
        productPrice: null
      });
    }
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => console.log("Modal Closed")}
      >
        <TouchableWithoutFeedback //Taking Care of Outside Modal Clicks
          style={{ flex: 1 }}
          onPress={this.props.modalClose}
        >
          <View //Giving the Transparent effect
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.7)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableWithoutFeedback /** Container, ToOverRide The TopLevel Touchable */
            >
              <View
                style={{
                  width: screenWidth - 28,
                  height: screenHeight / 2,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 10
                }}
              >
                <View //The Main Modal View...............................
                  style={{
                    flex: 1
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      padding: 8,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgb(238,238,238)"
                    }}
                  >
                    <TouchableOpacity //The Close Button
                      onPress={this.props.modalClose}
                      style={styles.closeX}
                    >
                      <Text style={{ color: "white" }}>X</Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 18,
                        alignSelf: "center"
                      }}
                    >
                      Add Products
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 3,
                      padding: 10,
                      width: "100%"
                    }}
                  >
                    <View style={styles.V1}>
                      <Text
                        style={{ flex: 1, alignSelf: "center", color: "black" }}
                      >
                        Product Name
                      </Text>
                      <TextInput
                        style={styles.TInput}
                        onChangeText={productName => {
                          this.setState({ productName });
                        }}
                        value={this.state.productName}
                      />
                    </View>
                    <View style={styles.V1}>
                      <Text
                        style={{ flex: 1, alignSelf: "center", color: "black" }}
                      >
                        Quantity
                      </Text>
                      <TextInput
                        style={styles.TInput}
                        onChangeText={productQuantity => {
                          this.setState({ productQuantity });
                        }}
                        keyboardType="numeric"
                        value={this.state.productQuantity}
                      />
                    </View>
                    <View style={styles.V1}>
                      <Text
                        style={{ flex: 1, alignSelf: "center", color: "black" }}
                      >
                        Price
                      </Text>
                      <TextInput
                        style={styles.TInput}
                        onChangeText={productPrice => {
                          this.setState({ productPrice });
                        }}
                        keyboardType="numeric"
                        value={this.state.productPrice}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.addToProductList();
                    }}
                    style={styles.addBtn}
                  >
                    <Text style={{ color: "black" }}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  closeX: {
    position: "absolute",
    top: 1,
    right: 1,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgb(255,63,54)"
  },
  TInput: {
    marginLeft: 10,
    flex: 1.5,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10
  },
  V1: {
    height: 40,
    width: "100%",
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: "row"
  },
  addBtn: {
    position: "absolute",
    right: 18,
    bottom: 18,
    backgroundColor: "rgb(42,182,115)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 28
  }
});
