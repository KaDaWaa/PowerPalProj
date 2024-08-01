import React from "react";
import UserProfile from "../components/userProfile";
import { useUserContext } from "../utils/userContext";

export default function Profile({ navigation }) {
  const { user, setUser } = useUserContext();

  return (
    <UserProfile userId={user._id} navigation={navigation} isMyProfile={true} />
  );
}
