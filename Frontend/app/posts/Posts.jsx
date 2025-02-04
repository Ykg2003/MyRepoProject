import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { io } from "socket.io-client";
import { useAuthContext } from "../../context/AuthContext";

// Initialize socket connection globally
const socket = io("http://192.168.1.3:3000");

export default function Posts({ post, onLike }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const { user } = useAuthContext();

  useEffect(() => {
    // Listen to the postLiked event
    const handlePostLiked = ({ postId }) => {
      if (postId === post._id) {
        setIsLiked(true);
      }
    };

    socket.on("postLiked", handlePostLiked);

    // Cleanup the socket listener on unmount
    return () => {
      socket.off("postLiked", handlePostLiked);
    };
  }, [post._id]);

  const handleThumbClick = () => {
    if (user?.role === "peon" && !isLiked) {
      setIsLiked(true);
      onLike(post._id);
      socket.emit("likePost", { postId: post._id });
    }
  };

  const statusColor = isLiked ? "green" : "red";

  return (
    <View
      style={{
        marginBottom: 16,
        marginTop: 2,
        backgroundColor: "white",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
    >
      {/* Profile Section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Image
          source={require("../../assets/images/profile.jpeg")}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {post.name || "Unknown User"}
          </Text>
        </View>
      </View>

      {/* Post Image Section */}
      {post.photo ? (
        <View style={{ width: "100%", height: 300 }}>
          <Image
            source={{ uri: post.photo }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            onError={(e) =>
              console.error("Image failed to load", e.nativeEvent.error)
            }
          />
        </View>
      ) : (
        <Text style={{ textAlign: "center", padding: 16, color: "gray" }}>
          Image not available
        </Text>
      )}

      {/* Caption Section */}
      {post.caption && (
        <Text
          style={{
            margin: 8,
            padding: 8,
            backgroundColor: "white",
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            color: "black",
          }}
        >
          {post.caption}
        </Text>
      )}

      {/* Status Section */}
      <View style={{ margin: 8 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: statusColor,
          }}
        >
          {isLiked ? "Status: Completed" : "Status: Pending"}
        </Text>
      </View>

      {/* Thumb Button for Peons */}
      {user?.role === "peon" && !isLiked && (
        <TouchableOpacity
          style={{ margin: 8 }}
          onPress={handleThumbClick}
          accessibilityLabel="Mark as Completed button"
          accessibilityHint="Marks the task as completed"
        >
          <AntDesign name="like1" size={35} color="green" />
        </TouchableOpacity>
      )}
    </View>
  );
}
