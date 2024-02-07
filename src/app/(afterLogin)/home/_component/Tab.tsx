"use client";

import useTabStore from "@/store/tab";
import cx from "classnames";
import styles from "./tab.module.scss";

export default function Tab() {
  const { tab, setTab } = useTabStore();
  const onClickDetailed = () => setTab("detailed");
  const onClickBrief = () => setTab("brief");

  return (
    <div className={styles.homeTab}>
      <div
        className={cx(styles.tabItem, tab === "detailed" && styles.active)}
        onClick={onClickDetailed}
      >
        detailed review
      </div>
      <div
        className={cx(styles.tabItem, tab === "brief" && styles.active)}
        onClick={onClickBrief}
      >
        brief review
      </div>
    </div>
  );
}
