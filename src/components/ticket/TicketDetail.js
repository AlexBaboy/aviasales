import React, {useEffect, useState} from 'react'
import moment from 'moment'
import styles from './TicketDetail.module.sass'

function TicketDetail (props) {

    const getDurationInFormat = (minutesCount) => {

        if(!minutesCount)   return ""

        let hours = Math.trunc(minutesCount/60);
        let minutes = minutesCount % 60;

        return hours + "ч " + minutes + "м"
    }

    const getCountStopsText = (countStops = 0) => {

        let countText;
        let num = countStops % 100;

        if (num >= 11 && num <= 19)
            countText = 'раз';
        else {
            switch (num % 10) {
                case 0:
                    countText = 'без пересадок'
                    break;
                case 1:
                    countText = countStops + ' пересадка'
                    break;
                case 2:
                case 3:
                case 4:
                    countText = countStops + ' пересадки'
                    break;
                default:
                    countText = 'без пересадок'
            }
        }
        return countText;
    }

    return (
        <>
            <div className={styles.ticket} key={props.price + props.carrier + props.segments[0].date}>

                <div className={styles.ticketHeader}>
                    <div className={styles.ticketPrice}> {props.price.toLocaleString()} Р</div>

                    <div className={styles.ticketLogo}>
                        <svg width="110" height="36" viewBox="0 0 110 36" fill="none" >
                            <rect width="110" height="36" fill="url(#pattern0)"/>
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use  transform="translate(0 -0.0555556) scale(0.00505051 0.0154321)"/>
                                </pattern>
                                <image id="image0" width="198" height="72" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAABICAMAAACa/3rHAAACTFBMVEUAAAByd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3q60zKdr1Fyd3pyd3pyd3pyd3q60zJyd3pyd3q60zK60zJyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3q60zK60zJyd3pyd3pyd3pyd3pyd3pyd3pyd3q60zK60zJyd3q60zJyd3pyd3pyd3pyd3q60zK60zJyd3pyd3pyd3pyd3pyd3pyd3q60zK60zK60zJyd3pyd3pyd3q60zJyd3q60zK60zK60zJyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3q60zK60zJyd3q60zK60zK60zJyd3q60zK60zJyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3q60zK60zK60zK60zK60zK60zK60zK60zK60zK60zK60zK60zK60zK60zJyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3pyd3q60zK60zJyd3q60zK60zK60zK60zK60zK60zJyd3q60zJyd3pyd3q60zK60zK60zK60zK60zK60zK60zK60zJyd3q60zK60zK60zK60zK60zK60zJyd3r////c6Za71DT+/vm+1jz///691TrX5oXq8sDA10H7/fHO4Gy81Tfz+Nva6JHx9tPe6prJ3Vvj7arR4nbH3Ff6/O70+N7M32bk7q3F2k/z99nT433a547g66Hw9c/C2EjP4W/B10Tp8bvu9Mj8/fX5++zG21XV5IDn8Lf4++ns88TF2lHh7KTD2UrK3mDS43rm77H3+ub2+ePY5olGYLsCAAAAjnRSTlMAxW17pxAEL3LrtwG1ApKhCuA12f7+EoY7/Qb5RwxxBDLnJOkKGvUd6+/7V/LYHejuXmKT5RNBFM+c1Sa0301gB7srjjj3g7spH3iEOJsiofRpLNzMiuOv0M4in8F1sGtVQMeTfmPV+ImNt9lTlqsWdsi/8VpxM+SkF2YoCUXew1GqEU6rDQ9KpEsyehAxeP6GJAAAB51JREFUeF7t2mdXFNkahuFHwAZsQabpdqCBISiSVJIgqEQBYVRMgyDmnEVHjxhQJzpz0ltNDOac4+Sczh87vfeu6tpdVTSy+ixXcRbXl1rrXW3h3bt37cYlJmTKlCnOnJ3nDm7bUpFYUTFjzdYd5xMmY8P6PXWFJNu/r3LHZUwqi/fu2k9m7sLKVemTJ2JrN40lf9tOJyaD2poqN4Ww/+NW2N/6OjeNo+i9Wtibc0chjS//s7Ows9rd+fRGqlbBvhLWuOkNdV+wb0Udvbm1n9p2LWgicnfCjtJ3u2lCutfDhmrcNEEVi2E7/86lCatMh80k7KKJc38Em9lOwQaGh4dfXFfdJHp83aCX/BI/gZXiWUypA7pINlmHYHNL2TQViGHXGIStNZcko3e+9cn+JPqPz+AOMQecMPPOUZjkauimsUkUgs2OZdMY4BC7zkTYDpKu79lfvmDDRLxLdpWY3ByYHVGEKOdbzsgpooChr3wG/b/Sb8bZzT7iVsIk7pAixHa+5Yw9FHBNVMgeEY0YZ70k5C6GUfR8RRXzdjPSN1BAr6li8BW91PbKN1fUBRoiwV0DozZFczgOmmaXX+dYGUtdfksRpgv5pBm94hOePL+reuWf3lX9elVkjJCmLh3B0hax7X1JYcphYJ3xP1JpWozBp0Nkpe+FyLhNmpOtCFbAAjIb+CfrS2gcXj+Hfo3LSi33qhnSVHuVK6Y0PqLZCV1adeTR0uPVadA5okvaVsc3HVkoXvf5Pgr4WmT8Qpa0rf5ggAJqEMTxIcvYjBXsMqfFuDci2fWDngz/q/KyTHsjgl0XoX6awkW1QNUSnydGecuzIXgLOhQhpT0DfufXkmbggcj4jaz9oj2BdZUIkjGPZaSiRGEirDMyNiohMlwbFdWSheBS31ECLrrAOEqT9VnsEQA1FPDYJ9wgS0ODYqM/Jt0GBIlnFRt70MW37yavVcaSTUqIjLzDSsBMB/yqGxVJJu+I8cizeUnAAQp4rR5z335HVn7XnsAS9+eQzObvZDwQF8UyPElWGcmeUBmylHIAS/k9kzuOHVvAh9PSgLKL7O4zS8pTI/lKrfBiBsl7Q+24RxYeaCe47B+QFAd+eDVf9NWmDCGl48vlXWNlxEZmREdkKkwpEDeLr8GRHmDu++wj64kAyvn9+Fo3s1c2RiORdH/4tI4bZHKvX5zg10i2AzoH3wNL5rJ14e9SZrZlRkdqHIAxMmIb4JfEN9klL5amsOwCMHFt/P4O8XYdlz7HJegm3Xf9gVPvxUtizI29FOQcdC7+KW4Dc5RleEqsMuZkAdYZ+h+Pm8mGC9JwnD8VvOCyG1lTAwp4ThKfTm/xmw7zs0gY/H6IZAM/8vF9Q94/EeAsVZh6MA0Kc8JrkdGEUBkZ4N5lw8Np4tEdlaS6KMpdKQqvnBVT3uIAR7K+Oz7dCMkeGoemb4ddi/i9nWC8fEMmZ1hkuEJmlAVnXFRMZmHuCW2QHHuiKcuUQS9fSB1Xbpu3//djZ6wTp1aqcExhVpszYrNDZiAoY3amYjINiF4kDVKOTjdmUF/vFb3j/j297xs++fMaBduDgBOKWWaZKWNjWVgZ4jiqb0+WJu09KCSD2z9KHY9J9Vz6tU+2HZqGFMXMU2LKeGf2BDLi+G5YES973wvAUR95KHOe/lMSyWjgkTiu5a9XQ0/ECf4zGZyCZrVi5UNvWBm4JJ5elqZHFyxfovBO1JHZz0+0kP5R4u6KqptkdBqqhZmKlZSM8DKa1KNISJvu14NIv+NlIuVdD7snDpKV5z7VU+J+EBmvyOhy8Aa/+DfdAj6JDy/DxfZAcoQTTPbhOX4RWMBmBeBa5vPvxXvJSp/WcUssjzgXB8moCppNChMJXYzY5HPDynDwyPklDgBl7Xx9m7GZn4ldYKpT2K7H+v1k6aac8Uxukp2BKklh5mVB15nHt19xWBlw8VpPR3zTZt6tbAYaGvmN1rmak5rmi3fvciJZ+kPKGP1LZNwjo71QzRJbzQGdo12dhZWBdcmKbEEL4IgXAw9rYEEtQCVZUv/mz6QT/Kc+Mlh7HkJLpvrgkxV4+ApFh5eBYtar6eDr7VidIh9ODQC+yCcLd/tFxmvpBH9KRltqwWnfTrsgSxM/vy3MDNRHaQfEnLYucN7iDzyK0BjVDL/aKhJGX5Nm9JZa8RVfgF7uxjUa8/BbGM0sRbAsPu0U1xagi12bHeAc9WxaBnSKF6EsmoGQzV8aB86xsLi0fVl7W0GZE5oeV8TmZcuWHS3Rvhwe0H4T7x8ZGb7q92jkvnZs3KZQis7CPlqLiLntM+ulkHbDTnYTc8cn0z5SoeS2wk7O8+W4Yqq4NUQhHXTCVraq/5YmG/z6IYVWtRj2crmC6OFPcsT1H67SONynYDerioj6BgZ+vyEMD1yjcZ1Jh+1sp4lKPAv7SV/jpgk5eRp2lLBtYhVfwJ7+tYXeXP4pJ2zqk8/oTeV+9P/wH6oKd8LO0s8V0fjcM3Jgc6t20XjW7kmA7SVsL6RQ8mesd2IyyFmZS2Nx132ajskiZ+u+fKuGk2cu1GIySV91YFcRyfKrPt67GJNPbevf36vcUrGhu7uiYtvKmtOTsWHKlCn4L1Z1L91o4uDfAAAAAElFTkSuQmCC"/>
                            </defs>
                        </svg>
                    </div>
                </div>
                { props && props.segments ?
                    props.segments.map((segment) =>
                        <div className={styles.segmentRow} key={segment.date}>
                            <div className={styles.segmentRowBlock}>
                                <div className={styles.destination}>
                                    {segment.origin} - {segment.destination}
                                </div>
                                <div className={styles.segmentTimeWithDate}>
                                    {moment(segment.date).format('DD.MM HH:mm')} -
                                    {" " + moment(segment.date).add(segment.duration, 'minutes').format('DD.MM HH:mm')}
                                </div>
                            </div>
                            <div className={styles.segmentRowBlock}>
                                <div className={styles.destination}>
                                    в пути
                                </div>
                                <div className={styles.segmentTime}>
                                    {getDurationInFormat(segment.duration)}
                                </div>
                            </div>
                            <div className={styles.segmentRowBlock}>
                                <div className={styles.destination}>
                                    {getCountStopsText(segment?.stops.length)}
                                </div>
                                <div className={styles.segmentTime}>
                                    {segment?.stops.join()}
                                </div>
                            </div>
                        </div>
                    ): ""}
            </div>
        </>
    )
}

export default TicketDetail