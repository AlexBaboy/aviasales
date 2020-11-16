import React, {useEffect, useMemo, useState} from 'react'
import moment from 'moment'
import styles from './Segment.module.sass'

const Segment = (props) => {

    const {
        date,
        origin,
        destination,
        duration,
        stops = [],
    } = props;

    const getDurationInFormat = (minutesCount) => {

        if(!minutesCount)   return ""

        const hours = Math.trunc(minutesCount/60);
        const minutes = minutesCount % 60;

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

    const getDatesFromTo = (dateFrom, durationInMinutes) => {

        const dateFromItog = moment(dateFrom).format('DD.MM HH:mm')
        const dateTo = moment(dateFromItog, 'DD.MM HH:mm').
                        add(durationInMinutes, 'minutes').format('DD.MM HH:mm')

        return dateFromItog + " - " + dateTo
    }

    const getSegmentsDate = useMemo( () => getDatesFromTo(date, duration), [date, duration])

    return (
        <>
            <div className={styles.segmentRow} key={date}>
                <div className={styles.segmentRowBlock}>
                    <div className={styles.destination}>
                        {origin} - {destination}
                    </div>
                    <div className={styles.segmentTimeWithDate}>
                        {getSegmentsDate}
                    </div>
                </div>
                <div className={styles.segmentRowBlock}>
                    <div className={styles.destination}>
                        в пути
                    </div>
                    <div className={styles.segmentTime}>
                        {getDurationInFormat(duration)}
                    </div>
                </div>
                <div className={styles.segmentRowBlock}>
                    <div className={styles.destination}>
                        {getCountStopsText(stops.length)}
                    </div>
                    <div className={styles.segmentTime}>
                        {stops.join()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(Segment)