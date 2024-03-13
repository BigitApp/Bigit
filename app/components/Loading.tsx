import React from 'react'
import ReactDOM from 'react-dom'
import CircularProgress from '@mui/material/CircularProgress'

let requestCount = 0
let startTime = 0

const LoadingContainer = (loadingText: string) => {
    return (
        <CircularProgress
            color="secondary"
            size={24}
            sx={{
                color: '#D58527',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px'
            }}
        />
    )
}

const loading = {
    start: (loadingText: string) => {
        if (requestCount === 0) {
            startTime = new Date().getTime();
            var dom = document.createElement('div');
            dom.setAttribute('class', 'myLoading fixed w-full h-full left-0 top-0 z-50');
            dom.setAttribute('style', 'background-color: rgba(7, 17, 27, 0)');
            document.body.appendChild(dom);
            // const root = ReactDOM.createRoot(dom);
            // root.render(LoadingContainer(loadingText));
            // 禁用按钮
            const buttons = document.querySelectorAll('.button');
            buttons.forEach((button: HTMLButtonElement) => {
                button.disabled = true;
            });
        }
        requestCount++;
    },
    stop: () => {
        requestCount--;
        if (requestCount === 0) {
            const endTime = new Date().getTime();
            const timer = endTime - startTime >= 100 ? 0 : 100;
            setTimeout(() => {
                const dom = document.querySelector('.myLoading');
                dom && dom.parentNode && dom.parentNode.removeChild(dom);
                // 重新启用按钮
                const buttons = document.querySelectorAll('.button');
                buttons.forEach((button: HTMLButtonElement) => {
                    button.disabled = false;
                });
            }, timer);
        }
    },
};

export default loading