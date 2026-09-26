import {r as ri}from'./chunk--GzbfV2w.js';import {_ as kE,a0 as El,a2 as J,a7 as tL,v,aF as hm,aK as PE,ah as cp,z as aD,aj as pe,ak as BE,aL as hp,N as UI,aE as G,aG as oe}from'./main-HU6NVVQV.js';var k=`
    .p-password {
        display: inline-flex;
        position: relative;
    }

    .p-password .p-password-overlay {
        min-width: 100%;
    }

    .p-password-meter {
        height: dt('password.meter.height');
        background: dt('password.meter.background');
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-label {
        height: 100%;
        width: 0;
        transition: width 1s ease-in-out;
        border-radius: dt('password.meter.border.radius');
    }

    .p-password-meter-weak {
        background: dt('password.strength.weak.background');
    }

    .p-password-meter-medium {
        background: dt('password.strength.medium.background');
    }

    .p-password-meter-strong {
        background: dt('password.strength.strong.background');
    }

    .p-password-meter-text {
        font-weight: dt('password.meter.text.font.weight');
        font-size: dt('password.meter.text.font.size');
    }

    .p-password-fluid {
        display: flex;
    }

    .p-password-fluid .p-password-input {
        width: 100%;
    }

    .p-password-input::-ms-reveal,
    .p-password-input::-ms-clear {
        display: none;
    }

    .p-password-overlay {
        padding: dt('password.overlay.padding');
        background: dt('password.overlay.background');
        color: dt('password.overlay.color');
        border: 1px solid dt('password.overlay.border.color');
        box-shadow: dt('password.overlay.shadow');
        border-radius: dt('password.overlay.border.radius');
    }

    .p-password-content {
        display: flex;
        flex-direction: column;
        gap: dt('password.content.gap');
    }

    .p-password-toggle-mask-icon {
        inset-inline-end: dt('form.field.padding.x');
        color: dt('password.icon.color');
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * calc(dt('icon.size') / 2));
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-password-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * dt('icon.size') / 2);
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-toggle-mask-icon) .p-password-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon) .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-password:has(.p-password-clear-icon):has(.p-password-toggle-mask-icon)  .p-password-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

`;var b={root:"p-password p-component"},x=(()=>{class n extends G{name="password";style=k;classes=b;static \u0275fac=(()=>{let e;return function(t){return (e||(e=hm(n)))(t||n)}})();static \u0275prov=oe({token:n,factory:n.\u0275fac})}return n})();var S=(()=>{class n extends J{componentName="InputPassword";mask=tL(true);_componentStyle=v(x);toggleMask(){this.mask.set(!this.mask());}get inputType(){return this.mask()?"password":"text"}static \u0275fac=(()=>{let e;return function(t){return (e||(e=hm(n)))(t||n)}})();static \u0275dir=PE({type:n,selectors:[["","pInputPassword",""]],hostVars:3,hostBindings:function(o,t){o&2&&(hp("type",t.inputType),UI(t.cx("root")));},inputs:{mask:[1,"mask"]},outputs:{mask:"maskChange"},features:[aD([x,{provide:pe,useExisting:n}]),BE([{directive:ri,inputs:["invalid","invalid","variant","variant","fluid","fluid","pSize","pSize","pInputTextPT","pInputTextPT","pInputTextUnstyled","pInputTextUnstyled","hostName","hostName"]}]),cp]})}return n})(),C=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=kE({type:n});static \u0275inj=El({})}return n})();export{C,S};