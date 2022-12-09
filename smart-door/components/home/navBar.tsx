import styles from "styles/navBar.module.scss";
import { Input, Button, Avatar, Dropdown } from "@nextui-org/react";
import SearchIcon from "assets/svg/searchIcon";
import { useEffect, useRef, useState } from "react";
import { colorList } from "../../assets/constants";
import NotificationIcon from "assets/svg/notificationIcon";
import QuestionIcon from "assets/svg/questionIcon";
import LogInIcon from "@/assets/svg/logInIcon";
import LogOutIcon from "@/assets/svg/logOutIcon";
import RegisterIcon from "@/assets/svg/registerIcon";
import ProfileIcon from "@/assets/svg/profileIcon";
import { useAppSelector } from "hooks";

const NavBar = () => {
  const [hasLogin, setHasLogin] = useState(false);
  const currentUser = useAppSelector((state) => state.user);
  const color = useRef<any>(
    colorList[Math.floor(Math.random() * colorList.length)]
  );
  console.log("color.current ", color.current);
  useEffect(() => {
    if (currentUser) {
      setHasLogin(true);
    } else {
      setHasLogin(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expired_at");
  }

  return (
    <div className={styles["navBar-container"]}>
      <div className={styles.leftSide}>
        <h2>Dashboard</h2>
        <Input
          type="search"
          width="400px"
          placeholder="Search for component"
          contentRight={<SearchIcon fill="white" size={16} />}
          className={styles.searchBar}
          style={{ visibility: "visible" }}
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
        <Avatar
          size="lg"
          textColor="white"
          text="Tus dep trai"
          color={color.current}
          style={{ marginRight: "4px" }}
        />
        <Dropdown>
          <Dropdown.Button
            style={{ backgroundColor: "black" }}
          ></Dropdown.Button>
          {hasLogin ? (
            <Dropdown.Menu style={{ width: "300px" }}>
              <Dropdown.Item icon={<ProfileIcon fill="#252525" />}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item icon={<LogOutIcon fill="#252525" />}>
                <div onClick={handleLogout}>Log out</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu style={{ width: "300px" }}>
              <Dropdown.Item icon={<LogInIcon fill="#252525" />}>
                Log in
              </Dropdown.Item>
              <Dropdown.Item icon={<RegisterIcon fill="#252525" />}>
                Register
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
