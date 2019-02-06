import { DmCustomElement } from './dm-custom-element.decorator';

const animationDuration: number = 4;
const hideTransitionDuration: number = 0.5;
const hideTimeout: number = 1000;

@DmCustomElement({
    selector: 'dm-arrow-bouncer',
    template: `
        <div class="dm-bouncer">
            <svg viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                <path fill="none" d="M0 0h24v24H0V0z"/>
            </svg>
        </div>
    `,
    style: `
        :host {
            display: block;
            width: 100px;
            height: 100px;
            background: #f2f2f2;
        }
        
        .dm-bouncer {
            animation: dm-bounce ${animationDuration}s infinite;
            opacity: 1;
            transition: opacity ${hideTransitionDuration}s ease-in-out;        
        }
        
        .hidden {
            opacity: 0;
        }
        
        .dm-bouncer > svg {
            width: 100%
        }
       
        @keyframes dm-bounce {
            0%, 75%, 85%, 100% {
            transform: translateY(0);
        }

        80%, 90% {
            transform: translateY(15px);
        }`,
})
export class DmArrowBouncer extends HTMLElement {
    bouncerElement: HTMLElement;
    timeoutId: number;

    constructor() {
        super();

        this.onWindowScroll = this.onWindowScroll.bind(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }

    public connectedCallback(): void {
        this.bouncerElement = this.shadowRoot.querySelector('.dm-bouncer');
        window.addEventListener('scroll', this.onWindowScroll);
    }

    public disconnectCallback(): void {
        window.removeEventListener('scroll', this.onWindowScroll);
        this.timeoutId = null;
    }

    private onWindowScroll() {
        if (this.timeoutId) {
            return;
        }

        this.timeoutId = setTimeout(() => {
            this.show();
            this.timeoutId = null;
        }, hideTimeout);

        this.hide();
    }

    private hide(): void {
        this.bouncerElement.classList.add('hidden');
    }

    private show(): void {
        this.bouncerElement.classList.remove('hidden');
    }
}
