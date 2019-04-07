import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid
} from "react-native";
import AnimatedField from "./components/animatedField";
import ModalView from "./components/modal";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class App extends Component {
  state = {
    customer_name: null,
    customer_email: null,
    customer_phone_num: null,
    total_cost: null,
    products: [
      {
        productId: "23",
        productName: "biki",
        productQuantity: 1,
        productPrice: 2
      }
    ],
    phonePlaceC: "grey",
    namePlaceC: "grey",
    productBorderC: "grey",
    visible: false
  };

  //FlatList RenderItem Views
  productRenderItem = item => {
    return (
      <View
        style={{
          height: 40,
          width: "100%",
          marginTop: 8,
          backgroundColor: "red",
          flexDirection: "row"
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <Text>{item.productName}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <Text>{item.productQuantity}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <Text>{item.productPrice}</Text>
        </View>
      </View>
    );
  };
  modalSendingProduct = product => {
    let productArr = [].concat(this.state.products);
    let index = productArr.length;
    productArr[index] = product;
    this.setState({ products: productArr });
  };
  onAddProduct = () => {
    this.setState({ visible: true });
  };
  submit = () => {
    if (
      this.state.customer_phone_num === null ||
      this.state.customer_name === null ||
      this.state.products.length == 0
    ) {
      if (
        this.state.customer_phone_num === null &&
        this.state.customer_name === null
      ) {
        this.setState({ phonePlaceC: "red", namePlaceC: "red" });
      } else if (this.state.customer_phone_num === null) {
        this.setState({ phonePlaceC: "red" });
        ToastAndroid.show("Phone Number Required", ToastAndroid.LONG);
      } else if (this.state.customer_name === null) {
        this.setState({ namePlaceC: "red" });
        ToastAndroid.show("Name Required", ToastAndroid.LONG);
      } else if (this.state.products.length == 0) {
        this.setState({ productBorderC: "red" });
        ToastAndroid.show("Atleast 1 Product Required", ToastAndroid.LONG);
      }
    } else {
      //submit
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <ModalView
          visible={this.state.visible}
          addData={this.modalSendingProduct}
          modalClose={() => {
            this.setState({ visible: false });
          }}
        />
        <View style={styles.view1}>
          <Text style={{ color: "black", fontSize: 18 }}>
            Customer Detailes
          </Text>
          <AnimatedField
            placeholder="Name"
            placeholderC={this.state.namePlaceC}
            text="Name"
            keyboardType="default"
            onChangeText={customer_name => this.setState({ customer_name })}
          />
          <AnimatedField
            placeholder="Email"
            placeholderC="grey"
            text="Email(optional)"
            keyboardType="email-address"
            onChangeText={customer_email => this.setState({ customer_email })}
          />
          <AnimatedField
            placeholder="Phone Number"
            placeholderC={this.state.phonePlaceC}
            text="Phone Number"
            keyboardType="phone-pad"
            onChangeText={customer_phone_num =>
              this.setState({ customer_phone_num })
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "row",
            marginTop: 10
          }}
        >
          <Text style={{ alignSelf: "center", color: "black" }}>
            Add Product
          </Text>
          <TouchableOpacity
            style={styles.AddProductsBtn}
            onPress={() => this.onAddProduct()}
          >
            <Text style={{ color: "white" }}>+</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.view2, { borderColor: this.state.productBorderC }]}
        >
          <Text style={{ color: "black", fontSize: 18, alignSelf: "center" }}>
            Product List
          </Text>
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={this.state.products}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    height: 40,
                    width: "100%",
                    marginTop: 8,
                    flexDirection: "row",
                    borderBottomWidth: 1
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center"
                    }}
                  >
                    <Text>Name</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center"
                    }}
                  >
                    <Text>Quantity</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center"
                    }}
                  >
                    <Text>Price</Text>
                  </View>
                </View>
              );
            }}
            renderItem={({ item }) => this.productRenderItem(item)}
            keyExtractor={item => item.productId}
          />
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => this.submit()}
        >
          <Text style={{ color: "white" }}>?</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(238,238,238)"
  },
  view1: {
    width: screenWidth - 8,
    height: screenHeight / 3,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: "rgb(238,238,238)",
    borderColor: "grey",
    margin: 4,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(248,248,248)"
  },
  view2: {
    height: screenHeight - screenHeight / 2 - 10,
    width: screenWidth - 8,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: "rgb(238,238,238)",
    margin: 4,
    marginTop: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(248,248,248)"
  },
  Text_Input: {
    height: 40,
    width: "100%",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1
  },
  submitBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "rgb(255,0,75)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    position: "absolute",
    bottom: 18,
    right: 10,
    elevation: 10
  },
  AddProductsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgb(42,182,115)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    elevation: 18
  }
});
