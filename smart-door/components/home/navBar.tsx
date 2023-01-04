import { Input, Button, Avatar, Dropdown, FormElement } from "@nextui-org/react";
import SearchIcon from "assets/svg/searchIcon";
import { useEffect, useRef, useState } from "react";
import { colorList } from "assets/constants";
import NotificationIcon from "assets/svg/notificationIcon";
import QuestionIcon from "assets/svg/questionIcon";
import LogInIcon from "@/assets/svg/logInIcon";
import LogOutIcon from "@/assets/svg/logOutIcon";
import RegisterIcon from "@/assets/svg/registerIcon";
import ProfileIcon from "@/assets/svg/profileIcon";
import { useAppDispatch, useAppSelector } from "hooks";
import { onLogout } from "reducer/user/userSlice";
import Link from "next/link";
import styles from "styles/navBar.module.scss";
import { validateAvatar } from "utils/users.utils";

const NavBar = () => {
  const [hasLogin, setHasLogin] = useState(false);
  const currentUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  // const searchBar = useRef<FormElement>(null as any);
  const color = useRef<any>(
    colorList[Math.floor(Math.random() * colorList.length)]
  );
  
  useEffect(() => {
    if (currentUser) {
      setHasLogin(true);
    } else {
      setHasLogin(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    dispatch(onLogout())
  }

  return (
    <div className={styles["navBar-container"]}>
      <div className={styles.leftSide}>
        <h2>Dashboard</h2>

        <Input
          type="search"
          width="400px"
          placeholder="Search for component"
          contentRight={<SearchIcon fill="#7A7A7A" size={16} />}
          className={styles.searchBar}
          style={{ visibility: "visible" }}
          // ref={searchBar}
        />
      </div>

      <div className={styles.rightSide}>
        <Button
          icon={<QuestionIcon fill="#7a7a7a" />}
          style={{ backgroundColor: "#252525", marginRight: "15px" }}
          auto
        />
        <Button
          icon={<NotificationIcon fill="#7a7a7a" />}
          style={{ backgroundColor: "#252525", marginRight: "15px" }}
          auto
        />

        {/* <Avatar
          size="lg"
          textColor="white"
          text="Tus dep trai"
          color={color.current}
          style={{ marginRight: "4px" }}
        /> */}
        <div className={styles.ava}>
          <img src={validateAvatar(currentUser.current?.avatarURL)} />
        </div>

        <Dropdown>
          <Dropdown.Button
            style={{ backgroundColor: "black" }}
          ></Dropdown.Button>
          {hasLogin ? (
            <Dropdown.Menu style={{ width: "300px" }}>
              <Dropdown.Item icon={<ProfileIcon fill="#252525" />}>
                <Link href="/admin/account" className={styles.linkNavigate}>Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item icon={<LogOutIcon fill="#252525" />}>
                <div onClick={handleLogout}>Log out</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu style={{ width: "300px" }}>
              <Dropdown.Item icon={<LogInIcon fill="#252525" />}>
                <Link href="/general/login">Log in</Link>
              </Dropdown.Item>
              <Dropdown.Item icon={<RegisterIcon fill="#252525" />}>
                <Link href="/admin/register">Register</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
