import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";
import store from "../../reduxToolkit";
import {getTicketsInitial, setTicketsReducer} from "../../reduxToolkit/toolkitSlice";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

let TICKETS = []
function TicketsList(props) {

    //const [tickets, setTickets] = useState([])
    const tickets = useSelector(state => state.toolkit.setTicketsReducer)
    const [exception, setException] = useState('')
    const [loading, setLoading] = useState(true)
    const [filter, setFilterValue] = useState()
    const [checkBoxChecked, setCheckBoxChecked] = useState(false)

    const dispatch = useDispatch()

    useEffect( () => {
        axios.get('https://front-test.beta.aviasales.ru/search')
            .then(res => {
                getTickets(res?.data?.searchId)
            })
            .catch( (error) => {
                setException(error.message)
            })
    },[])

    const getTickets = (searchIdNum) => {
        if(!searchIdNum)   return false

        axios.get('https://front-test.beta.aviasales.ru/tickets?searchId=' + searchIdNum)
            .then(res=> {
                if( res?.data?.tickets ) {
                    //TICKETS = res?.data?.tickets
                    //setTickets( res?.data?.tickets )

                    const TICKETS = res?.data?.tickets

                    console.log("48 !TICKETS")
                    console.log(TICKETS)
                    console.log(TICKETS.length)

                    // сразу сортируем цена - по возрастанию!!!
                    let sortedTickets = dispatch(setTicketsReducer(TICKETS));

                    console.log("sortedTickets")
                    console.log(sortedTickets)
                }
                setLoading(false)
            })
            .catch( (error) => {
                setException(error.message)
                //setTickets([])
                dispatch(setTicketsReducer([]))
            })
    }

    const makefilterTickets = (filteredTickets) => {
        //setTickets(filteredTickets)

        // сотировка по цене - по возрастанию !!!
        let sortedTickets = filteredTickets.sort((a,b) => a.price - b.price);
        //setTickets(sortedTickets)
        dispatch(setTicketsReducer(sortedTickets))
    }

    if(exception) return <div className={styles.content}><div className={styles.ticketsContainer}>Нет данных с сервера</div></div>
    if(loading) return <div className={styles.content}><div className={styles.ticketsContainer}>Идет загрузка...</div></div>

    return (
        <div className={styles.content}>

            <FilterLeft ticketsIntitial={TICKETS} makefilterTickets={makefilterTickets} />

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
                        <TicketDetail {...ticket} key={Math.random()}/>
                    )
                    :
                    <div>Билетов нет</div>
                }
            </div>
        </div>
    )
}

export default TicketsList
