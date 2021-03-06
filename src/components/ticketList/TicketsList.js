import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";
import {setTicketsInitial, setTickets} from "../../reduxToolkit/toolkitSlice";
import {useDispatch, useSelector} from "react-redux";

function TicketsList(props) {

    const ticketsInitial = useSelector(state => state.toolkit.ticketsInitial)
    const tickets = useSelector(state => state.toolkit.tickets)
    const exception = useSelector(state => state.toolkit.exception)
    const loading = useSelector(state => state.toolkit.loading)

    const dispatch = useDispatch()

    useEffect( () => {
        axios.get('https://front-test.beta.aviasales.ru/search')
            .then(res => {
                dispatch(setTicketsInitial(res?.data?.searchId))
            })
            .catch( (error) => {
                console.log(error.message)
            })
    },[])

    const makefilterTickets = (filteredTickets) => {
        dispatch(setTickets(filteredTickets))
    }

    if(exception) return <div className={styles.content}><div className={styles.ticketsContainer}>Нет данных с сервера</div></div>
    if(loading) return <div className={styles.content}><div className={styles.ticketsContainer}>Идет загрузка...</div></div>

    return (
        <div className={styles.content}>

            <FilterLeft ticketsIntitial={ticketsInitial} makefilterTickets={makefilterTickets} />

            <div className={styles.ticketsContainer}>
                <div className={styles.ticketTypeCheckers}>
                    <div className={styles.ticketTypeCheckerChecked}>
                        <div className={styles.ticketTypeCheckerText}>Самый дешевый</div>
                    </div>
                    <div className={styles.ticketTypeChecker}>
                        <div className={styles.ticketTypeCheckerText}>Самый быстрый</div>
                    </div>
                </div>
                {tickets ?
                    tickets.map((ticket) =>
                        <TicketDetail {...ticket} key={ticket.segments[0].date + ticket.segments[0].duration}/>
                    )
                    :
                    <div>Билетов нет</div>
                }
            </div>
        </div>
    )
}

export default TicketsList