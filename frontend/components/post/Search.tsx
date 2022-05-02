import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

const QuickSearch = ({children}: any) => {
    const [ searchQuery, setSearchQuery ] = useState('');
    const handleChange = (value: any) => {
        const valueEntered = !!value;
        setSearchQuery(value);
    }

    return (
        <>
        <div className="justify-content-center d-flex position-relative">
            <Form className="w-100">
                <FormControl type="text" placeholder="Search entire shop" 
                  className="w-100" onChange={e => handleChange(e.target.value)}/>
            </Form>
        </div>
            <section>
                {children}
            </section>
            <style jsx>{`
            section {
                padding-top: 20px;
                padding-bottom: 20px;
            }
            button:before {
              align-self: center;
              border-style: solid;
              border-width: 6px 4px 0 4px;
              border-color: #ffffff transparent transparent transparent;
              content: '';
              height: 0;
              margin-right: 5px;
              width: 0;
            }
          `}</style>

        </>
    );
};


export default QuickSearch;