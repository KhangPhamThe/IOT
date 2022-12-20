import React from "react"
import controlStyle from 'styles/control.module.scss'

interface PointProps {
    type: "in" | "out",
    position: string,
}

const Point = ({ type, position }: PointProps) => {
    if (type === "in") return (
        <div className={controlStyle.point} style={{ left: position }}></div>
    )
    else return (
        <div className={controlStyle.arrowRight} style={{ left: position }}></div>
    )
}

const TextLog = () => {
    return (
        <div className={controlStyle.TextLogContainer}>
            <div className={controlStyle.gr}>
                <div className={controlStyle.left + " " + controlStyle.title}>
                    <p>Day</p>
                </div>
                <div>Time</div>
            </div>

            <div className={controlStyle.scrollable}>



                <div className={controlStyle.gr}>
                    <div className={controlStyle.left}>
                        <p>Mon</p>
                    </div>
                    <div className={controlStyle.right}>
                        <div className={controlStyle.timeGr}>
                            <Point type="in" position="0px" />
                            <Point type="out" position="0px" />
                        </div>
                    </div>
                </div>

                <div className={controlStyle.gr}>
                    <div className={controlStyle.left}>
                        <p>Tue</p>
                    </div>
                    <div className={controlStyle.right}>
                        <div className={controlStyle.timeGr}>
                            <Point type="in" position="0px" />
                            <Point type="out" position="0px" />
                        </div>
                    </div>
                </div>

                <div className={controlStyle.gr}>
                    <div className={controlStyle.left}>
                        <p>Wed</p>
                    </div>
                    <div className={controlStyle.right}>
                        <div className={controlStyle.timeGr}>
                            <Point type="in" position="0px" />
                            <Point type="out" position="0px" />
                        </div>
                    </div>
                </div>

                <div className={controlStyle.gr}>
                    <div className={controlStyle.left}>
                        <p>Thu</p>
                    </div>
                    <div className={controlStyle.right}>
                        <div className={controlStyle.timeGr}>
                            <Point type="in" position="0px" />
                            <Point type="out" position="0px" />
                        </div>
                    </div>
                </div>

                <div className={controlStyle.gr}>
                    <div className={controlStyle.left}>
                        <p>Fri</p>
                    </div>
                    <div className={controlStyle.right}>
                        <div className={controlStyle.timeGr}>
                            <Point type="in" position="0px" />
                            <Point type="out" position="0px" />
                        </div>
                    </div>
                </div>

                <div className={controlStyle.gr}>
                    <div className={controlStyle.left}>
                        <p>Sat</p>
                    </div>
                    <div className={controlStyle.right}>
                        <div className={controlStyle.timeGr}>
                            <Point type="in" position="0px" />
                            <Point type="out" position="0px" />
                        </div>
                    </div>
                </div>

                <div className={controlStyle.gr}>
                    <div className={controlStyle.left}>
                        <p>Sun</p>
                    </div>
                    <div className={controlStyle.right}>
                        <div className={controlStyle.timeGr}>
                            <Point type="in" position="0px" />
                            <Point type="out" position="800px" />
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default TextLog