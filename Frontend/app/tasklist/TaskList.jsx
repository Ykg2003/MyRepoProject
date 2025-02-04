import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Posts from "../posts/Posts";

export default function TaskList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = io("http://192.168.1.3:3000"); // Adjust the URL as needed

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.3:3000/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Unable to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Listen for 'newPost' event from the server
    socket.on("newPost", (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
    });

    // Listen for 'postLiked' event
    socket.on("postLiked", ({ postId }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, isLiked: true } : post
        )
      );
    });

    return () => {
      socket.off("newPost"); // Clean up the event listener
      socket.off("postLiked"); // Clean up the event listener
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, isLiked: true } : post
      )
    );

    // Emit the like action to the server
    socket.emit("likePost", { postId });
  };

  return (
    <View className="bg-back">
      {loading ? (
        <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 16 }}>
          Loading posts...
        </Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Posts post={item} onLike={handleLike} />}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 16 }}>
              No posts available
            </Text>
          }
        />
      )}
    </View>
  );
}