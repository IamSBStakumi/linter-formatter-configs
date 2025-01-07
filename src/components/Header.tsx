"use client";

import styled from "styled-components";
import { Session } from "next-auth";
import { signOut as NextAuthSignOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import UserIcon from "@/public/user-icon.svg";
import firebaseAuth from "../lib/firebase/client";
import PullDownMenu from "./PullDownMenu";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 40%);
`;

const NavigationMenu = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: left;
  margin-left: 35px;
`;

const NavigationLink = styled.button`
  box-sizing: border-box;
  height: 59px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;

  &:hover {
    background-color: #eee;
  }

  &:active {
    background-color: #ddd;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  align-items: end;
  margin-right: 50px;
  text-align: right;
`;

const UserIconImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const UserIconImage = styled(Image)`
  cursor: pointer;
`;

const UserEmailContainer = styled.div`
  position: relative;
  margin-right: -10px;
  overflow: visible;
  font-size: 24px;
`;

const MenuLayout = styled.div`
  display: flex;
  flex-direction: column;
  float: right;
`;

const MenuItem = styled.button`
  width: 153px;
  height: 42px;
  font-size: 16px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;

  &:hover {
    background-color: #eee;
  }

  &:active {
    background-color: #ddd;
  }
`;

const Header = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const [isUserMenuDisplayed, setIsUserMenuDisplayed] = useState(false);

  const handleLogout = async () => {
    await NextAuthSignOut();
    await signOut(firebaseAuth);
  };

  return (
    session && (
      <Wrapper>
        <NavigationMenu>
          <NavigationLink onClick={() => router.push("/layoutList")}>
            レイアウト一覧画面
          </NavigationLink>
        </NavigationMenu>
        <UserContainer>
          <UserIconImageContainer>
            <UserIconImage
              src={UserIcon}
              alt="ユーザーアイコン"
              onClick={() => setIsUserMenuDisplayed(true)}
              height={85}
            />
            <PullDownMenu
              isDisplayed={isUserMenuDisplayed}
              setIsDisplayed={setIsUserMenuDisplayed}
            >
              <MenuLayout>
                <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
              </MenuLayout>
            </PullDownMenu>
          </UserIconImageContainer>
          <UserEmailContainer>{session?.user.email}</UserEmailContainer>
        </UserContainer>
      </Wrapper>
    )
  );
};

export default Header;
