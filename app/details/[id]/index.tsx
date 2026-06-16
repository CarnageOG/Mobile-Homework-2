import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((result) => setProduct(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.error_loading}>Product is Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error_loading}>Something went wrong...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.product_title}>{product.title}</Text>
        <Text style={styles.product_category}>{product.category}</Text>
        <Image source={{ uri: product.image }} style={styles.product_img} />
        <Text style={styles.product_price}>Price: {product.price} $</Text>
        <Text style={styles.product_des}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  error_loading: {
    fontSize: 18,
    color: "red",
  },

  card: {
    borderRadius: 12,
    padding: 20,
  },

  product_title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#070D0D",
    marginBottom: 10,
  },

  product_category: {
    fontSize: 15,
    color: "#777",
    marginBottom: 20,
  },

  product_img: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },

  product_price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#070D0D",
    marginBottom: 15,
  },

  product_des: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
  },
});
