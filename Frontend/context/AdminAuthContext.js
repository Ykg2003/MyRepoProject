import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";

// Create the AdminAuthContext
export const AdminAuthContext = createContext();

// Create the AdminAuthContextProvider
export const AdminAuthContextProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        const fetchAdminUser = async () => {
            try {
                const storedData = await AsyncStorage.getItem("clean-campus");
                if (storedData) {
                    setAdminUser(JSON.parse(storedData));
                }
            } catch (e) {
                console.error("Error reading from AsyncStorage", e);
            }
        };

        fetchAdminUser();
    }, []);

    return (
        <AdminAuthContext.Provider value={{ adminUser, setAdminUser }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

// Custom hook for using the AdminAuthContext
export const useAdminAuthContext = () => {
    return useContext(AdminAuthContext);
};