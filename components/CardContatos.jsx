import React from 'react';

export default function CardContatos({ email, first_name, last_name, avatar }) {
    return (
        <div 
            className="card" 
            styles={{ 
                width: '250px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                borderRadius: '8px',
            }}
        >
            <img 
                className="card-img-top" 
                src={avatar} 
                style={{ 
                    width: '100%', 
                    height: '214px', 
                    borderTopLeftRadius: '8px', 
                    borderTopRightRadius: '8px' 
                }} 
            />
            <div className="card-body" style={{ padding: '10px' }}>
                <h5 className="card-title">{first_name} {last_name}</h5>
                <a 
                    href={`mailto:${email}`} 
                    className="card-text" 
                    style={{ 
                        fontSize: '14px', 
                        display: 'block', 
                        wordBreak: 'break-word', 
                        overflowWrap: 'break-word'            
                    }}
                >
                    {email}
                </a>
            </div>
        </div>
    );
}
