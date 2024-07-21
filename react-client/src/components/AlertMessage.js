
import React from 'react';

/**
 *
 *  A component for displaying a string as a guess number corrections in a game.
 * @param string The string to display with guess of the player
 * @returns {JSX.Element} The rendered component.
 *
 */
const AlertMessage = ({ string }) => (
    <div style={{ backgroundColor: '#FEF6CE' }} className="d-flex align-items-center mt-3 mb-1">
        <div className="mt-1">
            <p>{string}</p>
        </div>
    </div>
);

export default AlertMessage;
