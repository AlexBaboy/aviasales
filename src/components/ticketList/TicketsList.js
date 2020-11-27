import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";
import store from "../../reduxToolkit";
import {getTicketsInitial} from "../../reduxToolkit/toolkitSlice";
import {useDispatch} from "react-redux";

let TICKETS = []
function TicketsList(props) {

    const [tickets, setTickets] = useState([])
    const [searchId, setSearchId] = useState('')
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
                console.log(error)
                setException(error.message)
            })
    },[])

    const getTickets = (searchIdNum) => {
        console.log("searchIdNum")
        console.log(searchIdNum)
        if(!searchIdNum)   return false
        setSearchId(searchIdNum)

        axios.get('https://front-test.beta.aviasales.ru/tickets?searchId=' + searchIdNum)
            .then(res=> {
                if( res?.data?.tickets ) {
                    //TICKETS = res?.data?.tickets
                    //setTickets( res?.data?.tickets )

                    const TICKETS = dispatch(getTicketsInitial(res?.data?.tickets)).payload

                    console.log("48 !TICKETS")
                    console.log(TICKETS)
                    debugger
                    // сразу сортируем цена - по возрастанию!!!
                    let sortedTickets = TICKETS.sort((a,b) => a.price - b.price);

                    console.log("sortedTickets")
                    console.log(sortedTickets)

                    //setTickets(sortedTickets)
                    dispatch(setTickets(sortedTickets))

                    //store.dispatch(getTickets((sortedTickets)))

                }
                setLoading(false)
            })
            .catch( (error) => {
                setException(error.message)
                setTickets([])
            })


    }

    const makefilterTickets = (filteredTickets) => {
        //setTickets(filteredTickets)

        // сотировка по цене - по возрастанию !!!
        let sortedTickets = filteredTickets.sort((a,b) => a.price - b.price);
        setTickets(sortedTickets)
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
