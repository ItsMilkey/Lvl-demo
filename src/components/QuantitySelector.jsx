import React from 'react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, min = 1, max = 99 }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0' }}>
            <button
                onClick={onDecrease}
                disabled={quantity <= min}
                className="btn-qty"
                style={{
                    padding: '5px 10px',
                    background: '#e0e0e0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: quantity <= min ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    color: '#333'
                }}
            >
                -
            </button>

            <span style={{
                fontWeight: 'bold',
                minWidth: '24px',
                textAlign: 'center',
                fontSize: '1rem'
            }}>
                {quantity}
            </span>

            <button
                onClick={onIncrease}
                disabled={quantity >= max}
                className="btn-qty"
                style={{
                    padding: '5px 10px',
                    background: '#e0e0e0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: quantity >= max ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    color: '#333'
                }}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
