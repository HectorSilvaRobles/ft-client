import React from 'react'
import './accordion.css'
import {Accordion, Card} from 'react-bootstrap'

function AccordionComp(props){
    return (
            <Accordion defaultActiveKey="0" >
                <Card className='accordion-card'>
                    <Accordion.Toggle eventKey="0" className='accordion-card-header'>
                        {props.coachPostTitle}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className='accordion-card-body'>{props.coachPostContent}</div>
                    </Accordion.Collapse>
                </Card>
                <Card className='accordion-card'>
                    <Accordion.Toggle eventKey="1" className='accordion-card-header'>
                        {props.performanceTitle}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <div className='accordion-card-body'>{props.performanceContent}</div>
                    </Accordion.Collapse>
                </Card>
                {props.adminShow ? 
                <Card className='accordion-card'>
                    <Accordion.Toggle className='accordion-card-header' eventKey="2">
                        {props.highlightsTitle}
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <div className='accordion-card-body'>{props.highlightsContent}</div>
                    </Accordion.Collapse>
                </Card> : null }
                {props.adminShow ? 
                <Card className='accordion-card'>
                    <Accordion.Toggle className='accordion-card-header' eventKey="3">
                        {props.manageAthleteTitle}
                     </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <div className='accordion-card-body'>{props.manageAthleteContent}</div>
                    </Accordion.Collapse>
                </Card> : null}
                <Card className='accordion-card'>
                    <Accordion.Toggle eventKey="4" className='accordion-card-header'>
                        {props.editCoachUser}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <div className='accordion-card-body'>{props.editCoachUserContent}</div>
                    </Accordion.Collapse>
                </Card>
                
            </Accordion>
        
    )
}

export default AccordionComp