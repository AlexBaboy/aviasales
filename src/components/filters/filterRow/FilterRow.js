import React from 'react'
import styles from './FilterRow.module.sass'

function FilterRow(props ) {

    const { id,
            text,
            checkBoxChecked,
            filterMake,
        } = props

    return (

        <>
            <div className={styles.filterRow}>
                <input className={styles.filterCheckbox} type="checkbox" id={id} checked={checkBoxChecked(id)} onChange={e =>filterMake(e)} />
                <div className={styles.filterCheckBoxLabelDiv}>
                    <label htmlFor={id}>{text}</label>
                </div>
            </div>
        </>
    )
}

export default React.memo(FilterRow)