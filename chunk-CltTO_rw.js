import {f as fo$1,V as Vt,A as Ao,F as Ft,a as fa,b as At}from'./chunk-ubvcPP_v.js';import {q as qo,n as na$1,i as ia,O as Ol,u as ui$1,Y as Yt,f as fe,a as oi$1}from'./chunk-CA2qqlvH.js';import {e as eL,v,b as bo,w as wD,p as pu,a as v$1,S as SE,cw as u0,cx as s0,cy as o0,cz as Hc,R as Rb,P as Pb,i as iI,s as sI,t,cA as e,n as na,g as Pt,cB as jt,cC as Hn$1,a5 as AE,a6 as El,a7 as Be,bc as In$1,a8 as Z,a9 as C,aa as k,ad as tL,f as r,ag as hr,cD as oL,ae as rL,aN as fm,an as ap,ao as II,aW as DI,B as iD,ap as ee,aq as VE,aT as pp,Y as BI,ar as wp,as as bI,b_ as Ja,cE as Cp,al as yi$1,aJ as J0,bv as cd,h as ai$1,G as lp,j as yc,k as hp,Q as Qy,cF as vc,K as KI,cG as Ec,$ as $a,z as lI,N as vI,m as jp,A as uI,cH as Uo,cI as jo,cJ as $o,aM as Y,aO as re$1,aY as vp,a1 as Ps,D as i0,cK as Bc,o as k0,L as L0,cL as pl,W as gp,F as jv,J as Hv,cM as Zo,cN as Yo,cO as Ko,cP as qo$1,cQ as zo,cR as Go,cS as Wo,cT as gD,cU as yD,ab as lL,ac as uL,X as XO,cV as Ya,am as ys,V as VI,bd as Wn,I as Ip,a3 as Tc,au as sm,at as nL,ak as lm,M as mI,bX as $p,bY as Bp,aL as Cp$1,U as Ul,O as ql,H as sD,bC as no$1,aX as Sp,d as s,cf as tD,a4 as ED}from'./main-HPCAOZAC.js';var sn=`
    .p-steplist {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 0;
        list-style-type: none;
        overflow-x: auto;
    }

    .p-step {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        gap: dt('stepper.step.gap');
        padding: dt('stepper.step.padding');
    }

    .p-step:last-of-type {
        flex: initial;
    }

    .p-step-header {
        border: 0 none;
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
        transition:
            background dt('stepper.transition.duration'),
            color dt('stepper.transition.duration'),
            border-color dt('stepper.transition.duration'),
            outline-color dt('stepper.transition.duration'),
            box-shadow dt('stepper.transition.duration');
        border-radius: dt('stepper.step.header.border.radius');
        outline-color: transparent;
        background: transparent;
        padding: dt('stepper.step.header.padding');
        gap: dt('stepper.step.header.gap');
    }

    .p-step-header:focus-visible {
        box-shadow: dt('stepper.step.header.focus.ring.shadow');
        outline: dt('stepper.step.header.focus.ring.width') dt('stepper.step.header.focus.ring.style') dt('stepper.step.header.focus.ring.color');
        outline-offset: dt('stepper.step.header.focus.ring.offset');
    }

    .p-stepper.p-stepper-readonly .p-step {
        cursor: auto;
    }

    .p-step-title {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        color: dt('stepper.step.title.color');
        font-weight: dt('stepper.step.title.font.weight');
        font-size: dt('stepper.step.title.font.size');
        transition:
            background dt('stepper.transition.duration'),
            color dt('stepper.transition.duration'),
            border-color dt('stepper.transition.duration'),
            box-shadow dt('stepper.transition.duration'),
            outline-color dt('stepper.transition.duration');
    }

    .p-step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        color: dt('stepper.step.number.color');
        border: 2px solid dt('stepper.step.number.border.color');
        background: dt('stepper.step.number.background');
        min-width: dt('stepper.step.number.size');
        height: dt('stepper.step.number.size');
        line-height: dt('stepper.step.number.size');
        font-size: dt('stepper.step.number.font.size');
        z-index: 1;
        border-radius: dt('stepper.step.number.border.radius');
        position: relative;
        font-weight: dt('stepper.step.number.font.weight');
    }

    .p-step-number::after {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: dt('stepper.step.number.border.radius');
        box-shadow: dt('stepper.step.number.shadow');
    }

    .p-step-active .p-step-header {
        cursor: default;
    }

    .p-step-active .p-step-number {
        background: dt('stepper.step.number.active.background');
        border-color: dt('stepper.step.number.active.border.color');
        color: dt('stepper.step.number.active.color');
    }

    .p-step-active .p-step-title {
        color: dt('stepper.step.title.active.color');
    }

    .p-step:not(.p-disabled):focus-visible {
        outline: dt('focus.ring.width') dt('focus.ring.style') dt('focus.ring.color');
        outline-offset: dt('focus.ring.offset');
    }

    .p-step:has(~ .p-step-active) .p-stepper-separator {
        background: dt('stepper.separator.active.background');
    }

    .p-stepper-separator {
        flex: 1 1 0;
        background: dt('stepper.separator.background');
        width: 100%;
        height: dt('stepper.separator.size');
        transition:
            background dt('stepper.transition.duration'),
            color dt('stepper.transition.duration'),
            border-color dt('stepper.transition.duration'),
            box-shadow dt('stepper.transition.duration'),
            outline-color dt('stepper.transition.duration');
    }

    .p-steppanels {
        padding: dt('stepper.steppanels.padding');
    }

    .p-steppanel {
        background: dt('stepper.steppanel.background');
        color: dt('stepper.steppanel.color');
    }

    .p-stepper:has(.p-stepitem) {
        display: flex;
        flex-direction: column;
    }

    .p-stepitem {
        display: flex;
        flex-direction: column;
        flex: initial;
    }

    .p-stepitem.p-stepitem-active {
        flex: 1 1 auto;
    }

    .p-stepitem .p-step {
        flex: initial;
    }
    
    .p-stepitem .p-steppanel {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-stepitem .p-steppanel-content-wrapper {
        display: flex;
        flex: 1 1 auto;
        min-height: 0;
    }
    .p-stepitem .p-steppanel-content {
        width: 100%;
        padding: dt('stepper.steppanel.padding');
        margin-inline-start: 1rem;
    }

    .p-stepitem .p-stepper-separator {
        flex: 0 0 auto;
        width: dt('stepper.separator.size');
        height: auto;
        margin: dt('stepper.separator.margin');
        position: relative;
        left: calc(-1 * dt('stepper.separator.size'));
    }

    .p-stepitem .p-stepper-separator:dir(rtl) {
        left: calc(-9 * dt('stepper.separator.size'));
    }

    .p-stepitem:has(~ .p-stepitem-active) .p-stepper-separator {
        background: dt('stepper.separator.active.background');
    }

    .p-stepitem:last-of-type .p-steppanel {
        padding-inline-start: dt('stepper.step.number.size');
    }
`;var De=["*"],yn=["content"];function An(t,o){t&1&&gp(0,"p-stepper-separator");}function Rn(t,o){if(t&1){let e=mI();ai$1(0,"button",0),Ip("click",function(){Ul(e);let i=vI();return ql(i.onStepClick())}),ai$1(1,"span",1),KI(2),yc(),ai$1(3,"span",1),DI(4),yc()(),iI(5,An,1,0,"p-stepper-separator");}if(t&2){let e=vI();BI(e.cx("header")),hp("pBind",e.ptm("header"))("tabindex",e.stepTabindex())("disabled",e.isStepDisabled()),pp("id",e.id())("role","tab")("aria-controls",e.ariaControls()),Qy(),BI(e.cx("number")),hp("pBind",e.ptm("number")),Qy(),jp(e.value()),Qy(),BI(e.cx("title")),hp("pBind",e.ptm("title")),Qy(2),sI(e.isSeparatorVisible()?5:-1);}}function Ln(t,o){t&1&&vp(0);}function $n(t,o){t&1&&gp(0,"p-stepper-separator");}function On(t,o){if(t&1&&(lp(0,Ln,1,0,"ng-container",2),iI(1,$n,1,0,"p-stepper-separator")),t&2){let e=vI();hp("ngTemplateOutlet",e.content())("ngTemplateOutletContext",e.contentContext()),Qy(),sI(e.isSeparatorVisible()?1:-1);}}function zn(t,o){t&1&&gp(0,"p-stepper-separator");}function jn(t,o){t&1&&vp(0);}var Gn=`
${sn}

.p-steppanel .p-motion {
    display: grid;
    grid-template-rows: 1fr;
}
`,qn={root:({instance:t})=>["p-stepper p-component",{"p-readonly":t.linear()}],separator:"p-stepper-separator"},Ge=(()=>{class t extends Y{name="stepper";style=Gn;classes=qn;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var Fe=new C("STEPPER_INSTANCE"),dn=new C("STEPLIST_INSTANCE"),pn=new C("STEPITEM_INSTANCE"),cn=new C("STEP_INSTANCE"),un=new C("STEPPANEL_INSTANCE"),mn=new C("STEPPANELS_INSTANCE"),fn=new C("STEPPERSEPARATOR_INSTANCE"),ut=(()=>{class t extends Z{$pcStepperSeparator=v(fn,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});componentName="StepperSeparator";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}_componentStyle=v(Ge);static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275cmp=SE({type:t,selectors:[["p-stepper-separator"]],hostVars:2,hostBindings:function(n,i){n&2&&BI(i.cx("separator"));},features:[iD([Ge,{provide:fn,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],ngContentSelectors:De,decls:1,vars:0,template:function(n,i){n&1&&(II(),DI(0));},dependencies:[In$1],encapsulation:2})}return t})(),Un={root:({instance:t})=>["p-step",{"p-step-active":t.active(),"p-disabled":t.isStepDisabled()}],header:"p-step-header",number:"p-step-number",title:"p-step-title"},gn=(()=>{class t extends Y{name="step";classes=Un;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var re=(()=>{class t extends Z{$pcStep=v(cn,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});componentName="Step";pcStepper=v(Fe);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}value=tL();disabled=eL(false,{transform:e=>qo(e)});active=wD(()=>this.pcStepper.isStepActive(this.value()));isStepDisabled=wD(()=>!this.active()&&(this.pcStepper.linear()||this.disabled()));stepTabindex=wD(()=>this.isStepDisabled()?-1:void 0);ariaCurrent=wD(()=>this.active()?"step":void 0);id=wD(()=>`${this.pcStepper.id()}_step_${this.value()}`);ariaControls=wD(()=>`${this.pcStepper.id()}_steppanel_${this.value()}`);isSeparatorVisible=wD(()=>{let e=this.pcStepper.stepList();if(e){let n=e.steps(),i=n.indexOf(this),r=n.length;return i!==r-1}else return  false});content=rL("content",{descendants:false});_componentStyle=v(gn);onStepClickCallback=this.onStepClick.bind(this);contentContext=wD(()=>({activateCallback:this.onStepClickCallback,value:this.value(),active:this.active()}));onStepClick(){this.pcStepper.updateValue(this.value());}static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275cmp=SE({type:t,selectors:[["p-step"]],contentQueries:function(n,i,r){n&1&&wp(r,i.content,yn,4),n&2&&bI();},hostVars:6,hostBindings:function(n,i){n&2&&(pp("aria-current",i.ariaCurrent())("role","presentation")("data-p-active",i.active())("data-p-disabled",i.isStepDisabled()),BI(i.cx("root")));},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[iD([gn,{provide:cn,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],ngContentSelectors:De,decls:2,vars:1,consts:[["type","button",3,"click","pBind","tabindex","disabled"],[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,i){n&1&&(II(),iI(0,Rn,6,16)(1,On,2,3)),n&2&&sI(i.content()?1:0);},dependencies:[yi$1,ut,Be,In$1,k],encapsulation:2})}return t})(),Kn={root:({instance:t})=>["p-steppanel",{"p-steppanel-active":t.isVertical()&&t.active()}],contentWrapper:"p-steppanel-content-wrapper",content:"p-steppanel-content"},hn=(()=>{class t extends Y{name="steppanel";classes=Kn;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var ke=(()=>{class t extends Z{$pcStepPanel=v(un,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});componentName="StepPanel";pcStepper=v(Fe);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}value=tL();active=wD(()=>this.pcStepper.value()===this.value());ariaControls=wD(()=>`${this.pcStepper.id()}_step_${this.value()}`);id=wD(()=>`${this.pcStepper.id()}_steppanel_${this.value()}`);isVertical=wD(()=>this.pcStepper.stepItems().length>0);isSeparatorVisible=wD(()=>{if(this.pcStepper.stepItems()){let e=this.pcStepper.stepItems().length,n=Ja(this.pcStepper.el.nativeElement,'[data-pc-name="steppanel"]');return Cp(this.el.nativeElement,n)!==e-1}});computedMotionOptions=wD(()=>r(r({},this.ptm("motion")),this.pcStepper.computedMotionOptions()));contentTemplate=rL("content",{descendants:false});_componentStyle=v(hn);updateValueCallback=this.updateValue.bind(this);contentContext=wD(()=>({activateCallback:this.updateValueCallback,value:this.value(),active:this.active()}));updateValue(e){this.pcStepper.updateValue(e);}static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275cmp=SE({type:t,selectors:[["p-step-panel"]],contentQueries:function(n,i,r){n&1&&wp(r,i.contentTemplate,yn,4),n&2&&bI();},hostVars:7,hostBindings:function(n,i){n&2&&(pp("role","tabpanel")("aria-controls",i.ariaControls())("id",i.id())("data-p-active",i.active())("data-pc-name","steppanel"),BI(i.cx("root")));},inputs:{value:[1,"value"]},outputs:{value:"valueChange"},features:[iD([hn,{provide:un,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],decls:5,vars:12,consts:[["name","p-collapsible",3,"visible","disabled","options"],[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,i){n&1&&(ai$1(0,"p-motion",0)(1,"div",1),iI(2,zn,1,0,"p-stepper-separator"),ai$1(3,"div",1),lp(4,jn,1,0,"ng-container",2),yc()()()),n&2&&(hp("visible",i.active())("disabled",!i.isVertical())("options",i.computedMotionOptions()),Qy(),BI(i.cx("contentWrapper")),hp("pBind",i.ptm("contentWrapper")),Qy(),sI(i.isSeparatorVisible()?2:-1),Qy(),BI(i.cx("content")),hp("pBind",i.ptm("content")),Qy(),hp("ngTemplateOutlet",i.contentTemplate())("ngTemplateOutletContext",i.contentContext()));},dependencies:[yi$1,ut,Be,In$1,k,J0,cd],encapsulation:2})}return t})(),Qn={root:({instance:t})=>["p-stepitem",{"p-stepitem-active":t.isActive()}]},bn=(()=>{class t extends Y{name="stepitem";classes=Qn;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var ct=(()=>{class t extends Z{$pcStepItem=v(pn,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});componentName="StepItem";_componentStyle=v(bn);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}pcStepper=v(Fe);value=tL();isActive=wD(()=>this.pcStepper.value()===this.value());step=rL(re,{descendants:false});stepPanel=rL(ke,{descendants:false});constructor(){super(),pu(()=>{this.step()?.value.set(this.value());}),pu(()=>{this.stepPanel()?.value.set(this.value());});}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=SE({type:t,selectors:[["p-step-item"]],contentQueries:function(n,i,r){n&1&&wp(r,i.step,re,4)(r,i.stepPanel,ke,4),n&2&&bI(2);},hostVars:3,hostBindings:function(n,i){n&2&&(pp("data-p-active",i.isActive()),BI(i.cx("root")));},inputs:{value:[1,"value"]},outputs:{value:"valueChange"},features:[iD([bn,{provide:pn,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],ngContentSelectors:De,decls:1,vars:0,template:function(n,i){n&1&&(II(),DI(0));},dependencies:[In$1],encapsulation:2})}return t})(),Xn={root:"p-steplist"},vn=(()=>{class t extends Y{name="steplist";classes=Xn;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var Te=(()=>{class t extends Z{$pcStepList=v(dn,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});componentName="StepList";steps=oL();_componentStyle=v(vn);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275cmp=SE({type:t,selectors:[["p-step-list"]],contentQueries:function(n,i,r){n&1&&wp(r,i.steps,re,4),n&2&&bI();},hostVars:2,hostBindings:function(n,i){n&2&&BI(i.cx("root"));},features:[iD([vn,{provide:dn,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],ngContentSelectors:De,decls:1,vars:0,template:function(n,i){n&1&&(II(),DI(0));},dependencies:[In$1],encapsulation:2})}return t})(),Yn={root:"p-steppanels"},xn=(()=>{class t extends Y{name="steppanel";classes=Yn;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var mt=(()=>{class t extends Z{$pcStepPanels=v(mn,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});componentName="StepPanels";_componentStyle=v(xn);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275cmp=SE({type:t,selectors:[["p-step-panels"]],hostVars:2,hostBindings:function(n,i){n&2&&BI(i.cx("root"));},features:[iD([xn,{provide:mn,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],ngContentSelectors:De,decls:1,vars:0,template:function(n,i){n&1&&(II(),DI(0));},dependencies:[Be,In$1],encapsulation:2})}return t})(),ft=(()=>{class t extends Z{componentName="Stepper";$pcStepper=v(Fe,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});_componentStyle=v(Ge);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}value=tL();linear=eL(false,{transform:e=>qo(e)});motionOptions=eL(void 0);computedMotionOptions=wD(()=>r(r({},this.ptm("motion")),this.motionOptions()));id=bo(hr("pn_id_"));stepItems=oL();steps=oL();stepList=rL(Te,{descendants:false});updateValue(e){this.value.set(e);}isStepActive(e){return this.value()===e}static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275cmp=SE({type:t,selectors:[["p-stepper"]],contentQueries:function(n,i,r){n&1&&wp(r,i.stepItems,ct,4)(r,i.steps,re,4)(r,i.stepList,Te,4),n&2&&bI(3);},hostVars:4,hostBindings:function(n,i){n&2&&(pp("role","tablist")("id",i.id()),BI(i.cx("root")));},inputs:{value:[1,"value"],linear:[1,"linear"],motionOptions:[1,"motionOptions"]},outputs:{value:"valueChange"},features:[iD([Ge,{provide:Fe,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],ngContentSelectors:De,decls:1,vars:0,template:function(n,i){n&1&&(II(),DI(0));},dependencies:[Be,In$1],encapsulation:2})}return t})(),Cn=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=AE({type:t});static \u0275inj=El({imports:[ft,Te,mt,ke,ct,re,ut,Be,In$1,Be,In$1]})}return t})();var qe=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-already-submitted-banner"]],decls:8,vars:0,consts:[["role","status",1,"my-8","flex","items-center","gap-3","rounded-lg","border","border-green-200","bg-green-50","px-5","py-4","dark:border-green-900","dark:bg-green-950/40"],[1,"text-2xl","text-green-600","dark:text-green-400"],[1,"flex","flex-col","gap-1","text-sm","text-green-900","dark:text-green-100"]],template:function(e,n){e&1&&(vc(0,"div",0)(1,"span",1),KI(2,"\u2713"),Ec(),vc(3,"div",2)(4,"strong"),KI(5,"You've already submitted this form."),Ec(),vc(6,"span"),KI(7,"Each form can only be submitted once per user."),Ec()()());},encapsulation:2})};var Zn=(t,o)=>o.key;function Jn(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function ei(t,o){if(t&1&&(ai$1(0,"span",3),lI(1,Jn,1,1,null,null,Zn),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var Ue=class t{field=eL.required();control=eL.required();inputType=eL.required();static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-simple-text-input"]],inputs:{field:[1,"field"],control:[1,"control"],inputType:[1,"inputType"]},decls:5,vars:6,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],["pInputText","",1,"w-full",3,"id","type","formControl"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),gp(3,"input",2),jv(),iI(4,ei,4,2,"span",3),yc()),e&2&&(Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),hp("id",n.field().name)("type",n.inputType())("formControl",n.control()),Hv(),Qy(),sI(n.control().invalid&&n.control().touched?4:-1));},dependencies:[u0,Ps,i0,Bc,k0,L0,pl],encapsulation:2})};var Dn=`
    .p-slider {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .p-slider-track {
        background: dt('slider.track.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider-handle {
        cursor: grab;
        touch-action: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        height: dt('slider.handle.height');
        width: dt('slider.handle.width');
        background: dt('slider.handle.background');
        border-radius: dt('slider.handle.border.radius');
        transition:
            background dt('slider.transition.duration'),
            color dt('slider.transition.duration'),
            border-color dt('slider.transition.duration'),
            box-shadow dt('slider.transition.duration'),
            outline-color dt('slider.transition.duration');
        outline-color: transparent;
    }

    .p-slider-handle::before {
        content: '';
        width: dt('slider.handle.content.width');
        height: dt('slider.handle.content.height');
        display: block;
        background: dt('slider.handle.content.background');
        border-radius: dt('slider.handle.content.border.radius');
        box-shadow: dt('slider.handle.content.shadow');
        transition: background dt('slider.transition.duration');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover {
        background: dt('slider.handle.hover.background');
    }

    .p-slider:not(.p-disabled) .p-slider-handle:hover::before {
        background: dt('slider.handle.content.hover.background');
    }

    .p-slider-handle:has(.p-slider-input:focus-visible){
        box-shadow: dt('slider.handle.focus.ring.shadow');
        outline: dt('slider.handle.focus.ring.width') dt('slider.handle.focus.ring.style') dt('slider.handle.focus.ring.color');
        outline-offset: dt('slider.handle.focus.ring.offset');
    }

    .p-slider-range {
        display: block;
        background: dt('slider.range.background');
        border-radius: dt('slider.track.border.radius');
    }

    .p-slider.p-slider-horizontal {
        height: dt('slider.handle.height');
    }

    .p-slider.p-slider-horizontal .p-slider-track {
        height: dt('slider.track.size');
    }

    .p-slider-horizontal .p-slider-range {
        height: 100%;
    }

    .p-slider-vertical {
        flex-direction: column;
        width: dt('slider.handle.width');
    }
        
    .p-slider-vertical .p-slider-track {
        min-height: 100px;
        width: dt('slider.track.size');
    }

    .p-slider-vertical .p-slider-range {
        width: 100%;
    }

    .p-slider-input {
        clip-path:inset(50%);
        overflow:hidden;
        white-space:nowrap;
        border:0;
        padding:0;
        width:100%;
        height:100%;
        margin:-1px;
        position:fixed;top:0;left:0;
    }
`;var Mn=()=>({index:0}),ti=()=>({index:1});function ni(t,o){if(t&1){let e=mI();ai$1(0,"span",2),Ip("pointerdown",function(i){Ul(e);let r=vI();return ql(r.onHandlePointerDown(i,0))}),ai$1(1,"input",3),Ip("input",function(i){Ul(e);let r=vI();return ql(r.onInputChange(i,0))})("change",function(i){Ul(e);let r=vI();return ql(r.onInputChange(i,0))})("focus",function(i){Ul(e);let r=vI();return ql(r.onInputFocus(i,0))})("blur",function(i){Ul(e);let r=vI();return ql(r.onInputBlur(i,0))})("keydown",function(i){Ul(e);let r=vI();return ql(r.onKeyDown(i,0))}),yc()();}if(t&2){let e=vI();VI(e.sx("handle",true,sD(23,Mn))),BI(e.cx("handle")),hp("pBind",e.ptm("handle")),pp("data-index",0)("data-disabled",e.getDataDisabled(0)),Qy(),BI(e.cx("input")),hp("min",e.min())("max",e.max())("step",e.$step())("value",e.getHandleValue(0))("disabled",e.isHandleDisabled(0))("pAutoFocus",e.autofocus())("pBind",e.ptm("input")),pp("aria-valuemin",e.min())("aria-valuemax",e.max())("aria-valuenow",e.getHandleValue(0))("aria-orientation",e.orientation())("aria-label",e.ariaLabel())("aria-labelledby",e.ariaLabelledBy())("tabindex",e.getHandleTabindex(0));}}function ii(t,o){if(t&1){let e=mI();ai$1(0,"span",2),Ip("pointerdown",function(i){Ul(e);let r=vI();return ql(r.onHandlePointerDown(i,0))}),ai$1(1,"input",3),Ip("input",function(i){Ul(e);let r=vI();return ql(r.onInputChange(i,0))})("change",function(i){Ul(e);let r=vI();return ql(r.onInputChange(i,0))})("focus",function(i){Ul(e);let r=vI();return ql(r.onInputFocus(i,0))})("blur",function(i){Ul(e);let r=vI();return ql(r.onInputBlur(i,0))})("keydown",function(i){Ul(e);let r=vI();return ql(r.onKeyDown(i,0))}),yc()(),ai$1(2,"span",2),Ip("pointerdown",function(i){Ul(e);let r=vI();return ql(r.onHandlePointerDown(i,1))}),ai$1(3,"input",4),Ip("input",function(i){Ul(e);let r=vI();return ql(r.onInputChange(i,1))})("change",function(i){Ul(e);let r=vI();return ql(r.onInputChange(i,1))})("focus",function(i){Ul(e);let r=vI();return ql(r.onInputFocus(i,1))})("blur",function(i){Ul(e);let r=vI();return ql(r.onInputBlur(i,1))})("keydown",function(i){Ul(e);let r=vI();return ql(r.onKeyDown(i,1))}),yc()();}if(t&2){let e=vI();VI(e.sx("startHandler")),BI(e.cx("handle",sD(45,Mn))),hp("pBind",e.ptm("startHandler")),pp("data-index",0)("data-disabled",e.getDataDisabled(0)),Qy(),BI(e.cx("input")),hp("min",e.min())("max",e.max())("step",e.$step())("value",e.getHandleValue(0))("disabled",e.isHandleDisabled(0))("pAutoFocus",e.autofocus())("pBind",e.ptm("input")),pp("aria-valuemin",e.min())("aria-valuemax",e.max())("aria-valuenow",e.getHandleValue(0))("aria-orientation",e.orientation())("aria-label",e.ariaLabel())("aria-labelledby",e.ariaLabelledBy())("tabindex",e.getHandleTabindex(0)),Qy(),VI(e.sx("endHandler")),BI(e.cx("handle",sD(46,ti))),hp("pBind",e.ptm("endHandler")),pp("data-index",1)("data-disabled",e.getDataDisabled(1)),Qy(),BI(e.cx("input")),hp("min",e.min())("max",e.max())("step",e.$step())("value",e.getHandleValue(1))("disabled",e.isHandleDisabled(1))("pBind",e.ptm("input")),pp("aria-valuemin",e.min())("aria-valuemax",e.max())("aria-valuenow",e.getHandleValue(1))("aria-orientation",e.orientation())("aria-label",e.ariaLabel())("aria-labelledby",e.ariaLabelledBy())("tabindex",e.getHandleTabindex(1));}}var oi={root:()=>({display:"flex",position:"relative","touch-action":"none"}),track:()=>({display:"block","flex-grow":1,position:"relative"}),range:({instance:t})=>{if(t.range()){let o=t.values()??[0,0],e=t.getValuePercent(Math.min(o[0],o[1])),n=t.getValuePercent(Math.max(o[0],o[1])),i=Math.max(n-e,0);return t.isHorizontal()?{position:"absolute","inset-inline-start":e+"%",width:i+"%"}:{position:"absolute",bottom:e+"%",height:i+"%"}}else {let o=t.getValuePercent(t.value()??0);return t.isHorizontal()?{position:"absolute",width:o+"%"}:{position:"absolute",bottom:"0",height:o+"%"}}},handle:({instance:t,index:o})=>{let e=o??0,n=t.getHandleValue(e),i=t.getValuePercent(n),u=t.isHandleDisabled(e)?{cursor:"default","pointer-events":"none"}:{};return t.isHorizontal()?s(r({},u),{position:"absolute","inset-inline-start":i+"%",translate:"-50% 0"}):s(r({},u),{position:"absolute",bottom:i+"%",translate:"0 50%"})},startHandler:({instance:t})=>{let o=t.getHandleValue(0),e=t.getValuePercent(o),i=t.isHandleDisabled(0)?{cursor:"default","pointer-events":"none"}:{};return t.isHorizontal()?s(r({},i),{position:"absolute","inset-inline-start":e+"%",translate:"-50% 0"}):s(r({},i),{position:"absolute",bottom:e+"%",translate:"0 50%"})},endHandler:({instance:t})=>{let o=t.getHandleValue(1),e=t.getValuePercent(o),i=t.isHandleDisabled(1)?{cursor:"default","pointer-events":"none"}:{};return t.isHorizontal()?s(r({},i),{position:"absolute","inset-inline-start":e+"%",translate:"-50% 0"}):s(r({},i),{position:"absolute",bottom:e+"%",translate:"0 50%"})}},ri={root:({instance:t})=>["p-slider p-component",{"p-disabled":t.$disabled(),"p-slider-horizontal":t.isHorizontal(),"p-slider-vertical":t.isVertical()}],track:"p-slider-track",range:"p-slider-range",handle:"p-slider-handle",input:"p-slider-input"},Sn=(()=>{class t extends Y{name="slider";style=Dn;classes=ri;inlineStyles=oi;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var ai={provide:Wn,useExisting:no$1(()=>Ke),multi:true},Ke=(()=>{class t extends Yt{componentName="Slider";bindDirectiveInstance=v(k,{self:true});_componentStyle=v(Sn);animate=eL(void 0,{transform:lL});min=eL(0,{transform:uL});max=eL(100,{transform:uL});orientation=eL("horizontal");step=eL(void 0,{transform:uL});range=eL(void 0,{transform:lL});minStepsBetweenHandles=eL(0,{transform:uL});disabledMinHandle=eL(false,{transform:lL});disabledMaxHandle=eL(false,{transform:lL});ariaLabel=eL();ariaLabelledBy=eL();tabindex=eL(0,{transform:uL});autofocus=eL(false,{transform:lL});onChange=XO();onSlideEnd=XO();onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}value=bo(null);values=bo(null);isDragging=bo(false);dragging=wD(()=>this.isDragging());dataDragging=wD(()=>this.isDragging()?"":null);activeIndex=0;get handleIndex(){return this.activeIndex}focusedIndex=null;isHandlePointerDown=false;dragOffsetPx=0;isHorizontal=wD(()=>this.orientation()==="horizontal");isVertical=wD(()=>this.orientation()==="vertical");$step=wD(()=>this.step()||1);$tabindex=wD(()=>this.$disabled()?-1:this.tabindex());isHandleDisabled(e){return this.$disabled()||e===0&&this.disabledMinHandle()||e===1&&this.disabledMaxHandle()}getDataDisabled(e){return this.isHandleDisabled(e)?"":null}getHandleTabindex(e){return this.isHandleDisabled(e)?-1:this.$tabindex()}dataP=wD(()=>this.cn({[this.orientation()]:this.orientation()}));clamp(e,n,i){return Math.min(Math.max(e,n),i)}getPrecision(e){let n=e.toString();if(n.includes("e-"))return Number(n.split("e-")[1]||0);let i=n.indexOf(".");return i>=0?n.length-i-1:0}roundToStep(e,n,i){if(!n)return e;let r=this.getPrecision(n),u=Math.round((e-i)/n)*n+i;return Number(u.toFixed(r))}normalizeValue(e){let n=this.step()||1;return this.clamp(this.roundToStep(e,n,this.min()),this.min(),this.max())}getValuePercent(e){let n=this.max()-this.min();return n?this.clamp((e-this.min())/n*100,0,100):0}getHandleValue(e){return this.getValues()[e]??this.min()}getValues(){return this.range()?(this.values()??[this.min(),this.min()]).map(n=>this.normalizeValue(n)):[this.normalizeValue(this.value()??this.min())]}getValueFromPointer(e,n=0){let i=this.el.nativeElement.getBoundingClientRect(),r=this.isHorizontal()?i.width:i.height;if(!r)return this.min();let C=((this.isHorizontal()?e.clientX-i.left:e.clientY-i.top)-n)/r,S=this.clamp(C,0,1),F=this.isHorizontal()&&Ya(this.el.nativeElement),Z=this.isHorizontal()?F?1-S:S:1-S,he=this.min()+Z*(this.max()-this.min());return this.normalizeValue(he)}getClosestValueIndex(e,n,i){let r=e.map((F,Z)=>Z).filter(F=>!this.isHandleDisabled(F));if(!r.length)return  -1;let u=r[0],C=Math.abs(e[u]-n),S=i?this.isHorizontal()?i.clientX:i.clientY:null;for(let F of r.slice(1)){let Z=Math.abs(e[F]-n);if(Z<C)u=F,C=Z;else if(Z===C&&S!==null){let he=this.getHandleElement(u),Ie=this.getHandleElement(F);if(he&&Ie){let oe=he.getBoundingClientRect(),Ve=Ie.getBoundingClientRect(),rt=this.isHorizontal()?oe.left+oe.width/2:oe.top+oe.height/2,ht=this.isHorizontal()?Ve.left+Ve.width/2:Ve.top+Ve.height/2;if(rt===ht)u=S<rt?Math.min(u,F):Math.max(u,F);else {let Pn=Math.abs(S-rt);Math.abs(S-ht)<Pn&&(u=F);}}}}return u}getHandleElement(e){return this.el.nativeElement.querySelector(`[data-index="${e}"]`)}updateValueAt(e,n,i){let r=this.getValues(),u=this.clamp(this.normalizeValue(n),this.min(),this.max());if(this.range()){let C=Math.max(this.minStepsBetweenHandles()*(this.step()||1),0),S=e>0?r[e-1]+C:this.min(),F=e<r.length-1?r[e+1]-C:this.max(),Z=Math.min(S,F),he=Math.max(S,F),Ie=this.clamp(u,Z,he),oe=[...r];oe[e]=Ie,this.values.set(oe),this.onModelChange(oe),this.onChange.emit({event:i,values:oe});}else this.value.set(u),this.onModelChange(u),this.onChange.emit({event:i,value:u});}updateValueFromPointer(e){let n=this.getValueFromPointer(e,this.dragOffsetPx),i=this.getValues();if(this.range()){let r=this.getClosestValueIndex(i,n,e);if(r===-1)return;this.activeIndex=r,this.dragOffsetPx=0,this.updateValueAt(this.activeIndex,n,e);}else {if(this.isHandleDisabled(0))return;this.activeIndex=0,this.dragOffsetPx=0,this.updateValueAt(0,n,e);}}onTrackPointerDown(e){if(!this.$disabled()&&!(e.pointerType==="mouse"&&e.button!==0)){if(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),this.isDragging.set(true),this.isHandlePointerDown){this.isHandlePointerDown=false;return}this.dragOffsetPx=0,this.updateValueFromPointer(e);}}onTrackPointerMove(e){this.$disabled()||this.isDragging()&&(this.isHandleDisabled(this.activeIndex)||(e.preventDefault(),this.updateValueAt(this.activeIndex,this.getValueFromPointer(e,this.dragOffsetPx),e)));}onTrackPointerUp(e){this.$disabled()||(e.preventDefault(),e.currentTarget.releasePointerCapture(e.pointerId),this.isDragging.set(false),this.isHandlePointerDown=false,this.dragOffsetPx=0,this.range()?this.onSlideEnd.emit({originalEvent:e,values:this.values()}):this.onSlideEnd.emit({originalEvent:e,value:this.value()}));}onHandlePointerDown(e,n){if(this.$disabled()||e.pointerType==="mouse"&&e.button!==0)return;e.preventDefault();let i=this.getHandleElement(n);if(i){let r=i.getBoundingClientRect(),u=this.isHorizontal()?r.left+r.width/2:r.top+r.height/2,C=this.isHorizontal()?e.clientX:e.clientY;this.dragOffsetPx=C-u;}else this.dragOffsetPx=0;this.activeIndex=n,this.isHandlePointerDown=true;}onInputChange(e,n){if(this.isHandleDisabled(n))return;this.activeIndex=n;let i=Number(e.target.value);this.updateValueAt(n,i,e),this.range()?this.onSlideEnd.emit({originalEvent:e,values:this.values()}):this.onSlideEnd.emit({originalEvent:e,value:this.value()});}onInputFocus(e,n){this.isHandleDisabled(n)||(this.focusedIndex=n,this.activeIndex=n);}onInputBlur(e,n){this.isHandleDisabled(n)||(this.activeIndex=n,this.focusedIndex===n&&(this.focusedIndex=null),this.range()?this.onSlideEnd.emit({originalEvent:e,values:this.values()}):this.onSlideEnd.emit({originalEvent:e,value:this.value()}),this.onModelTouched());}onKeyDown(e,n){if(this.isHandleDisabled(n))return;this.activeIndex=n;let i=this.step()||1;switch(e.code){case "ArrowDown":case "ArrowLeft":this.decrementValue(e,n,i),e.preventDefault();break;case "ArrowUp":case "ArrowRight":this.incrementValue(e,n,i),e.preventDefault();break;case "PageDown":this.decrementValue(e,n,i*10),e.preventDefault();break;case "PageUp":this.incrementValue(e,n,i*10),e.preventDefault();break;case "Home":this.updateValueAt(n,this.min(),e),e.preventDefault();break;case "End":this.updateValueAt(n,this.max(),e),e.preventDefault();break;}}decrementValue(e,n,i){let r=this.getHandleValue(n);this.updateValueAt(n,r-i,e);}incrementValue(e,n,i){let r=this.getHandleValue(n);this.updateValueAt(n,r+i,e);}writeControlValue(e){this.range()?this.values.set(e||[0,0]):this.value.set(e||0);}static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275cmp=SE({type:t,selectors:[["p-slider"]],hostVars:6,hostBindings:function(n,i){n&1&&Ip("pointerdown",function(u){return i.onTrackPointerDown(u)})("pointermove",function(u){return i.onTrackPointerMove(u)})("pointerup",function(u){return i.onTrackPointerUp(u)}),n&2&&(pp("data-orientation",i.orientation())("data-dragging",i.dataDragging()),VI(i.sx("root")),BI(i.cx("root")));},inputs:{animate:[1,"animate"],min:[1,"min"],max:[1,"max"],orientation:[1,"orientation"],step:[1,"step"],range:[1,"range"],minStepsBetweenHandles:[1,"minStepsBetweenHandles"],disabledMinHandle:[1,"disabledMinHandle"],disabledMaxHandle:[1,"disabledMaxHandle"],ariaLabel:[1,"ariaLabel"],ariaLabelledBy:[1,"ariaLabelledBy"],tabindex:[1,"tabindex"],autofocus:[1,"autofocus"]},outputs:{onChange:"onChange",onSlideEnd:"onSlideEnd"},features:[iD([ai,Sn,{provide:ee,useExisting:t}]),VE([k]),ap],decls:4,vars:12,consts:[[3,"pBind"],[3,"class","style","pBind"],[3,"pointerdown","pBind"],["type","range",3,"input","change","focus","blur","keydown","min","max","step","value","disabled","pAutoFocus","pBind"],["type","range",3,"input","change","focus","blur","keydown","min","max","step","value","disabled","pBind"]],template:function(n,i){n&1&&(ai$1(0,"div",0),gp(1,"span",0),yc(),iI(2,ni,2,24,"span",1),iI(3,ii,4,47)),n&2&&(VI(i.sx("track")),BI(i.cx("track")),hp("pBind",i.ptm("track")),Qy(),VI(i.sx("range")),BI(i.cx("range")),hp("pBind",i.ptm("range")),Qy(),sI(i.range()?-1:2),Qy(),sI(i.range()?3:-1));},dependencies:[ys,Be,In$1,k],encapsulation:2})}return t})(),wn=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=AE({type:t});static \u0275inj=El({imports:[Ke,Be,Be]})}return t})();var si=(t,o)=>o.key;function di(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function pi(t,o){if(t&1&&(ai$1(0,"span",4),lI(1,di,1,1,null,null,si),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var Qe=class t{field=eL.required();control=eL.required();static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-range-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:7,vars:6,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],[3,"id","formControl"],[1,"mt-1","text-sm","text-surface-500","dark:text-surface-400"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),gp(3,"p-slider",2),jv(),ai$1(4,"span",3),KI(5),yc(),iI(6,pi,4,2,"span",4),yc()),e&2&&(Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),hp("id",n.field().name)("formControl",n.control()),Hv(),Qy(2),jp(n.control().value),Qy(),sI(n.control().invalid&&n.control().touched?6:-1));},dependencies:[u0,i0,Bc,wn,Ke,pl],encapsulation:2})};var Fn=`
    .p-colorpicker {
        display: inline-block;
        position: relative;
    }

    .p-colorpicker-dragging {
        cursor: pointer;
    }

    .p-colorpicker-preview {
        width: dt('colorpicker.preview.width');
        height: dt('colorpicker.preview.height');
        padding: 0;
        border: 0 none;
        border-radius: dt('colorpicker.preview.border.radius');
        transition:
            background dt('colorpicker.transition.duration'),
            color dt('colorpicker.transition.duration'),
            border-color dt('colorpicker.transition.duration'),
            outline-color dt('colorpicker.transition.duration'),
            box-shadow dt('colorpicker.transition.duration');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-colorpicker-preview:enabled:focus-visible {
        border-color: dt('colorpicker.preview.focus.border.color');
        box-shadow: dt('colorpicker.preview.focus.ring.shadow');
        outline: dt('colorpicker.preview.focus.ring.width') dt('colorpicker.preview.focus.ring.style') dt('colorpicker.preview.focus.ring.color');
        outline-offset: dt('colorpicker.preview.focus.ring.offset');
    }

    .p-colorpicker-panel {
        background: dt('colorpicker.panel.background');
        border: 1px solid dt('colorpicker.panel.border.color');
        border-radius: dt('colorpicker.panel.border.radius');
        box-shadow: dt('colorpicker.panel.shadow');
        width: 193px;
        height: 166px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .p-colorpicker-panel-inline {
        box-shadow: none;
        position: static;
    }

    .p-colorpicker-content {
        position: relative;
    }

    .p-colorpicker-color-selector {
        width: 150px;
        height: 150px;
        inset-block-start: 8px;
        inset-inline-start: 8px;
        position: absolute;
    }

    .p-colorpicker-color-background {
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    }

    .p-colorpicker-color-handle {
        position: absolute;
        inset-block-start: 0px;
        inset-inline-start: 150px;
        border-radius: 100%;
        width: 10px;
        height: 10px;
        border-width: 1px;
        border-style: solid;
        margin: -5px 0 0 -5px;
        cursor: pointer;
        opacity: 0.85;
        border-color: dt('colorpicker.handle.color');
    }

    .p-colorpicker-hue {
        width: 17px;
        height: 150px;
        inset-block-start: 8px;
        inset-inline-start: 167px;
        position: absolute;
        opacity: 0.85;
        background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
    }

    .p-colorpicker-hue-handle {
        position: absolute;
        inset-block-start: 150px;
        inset-inline-start: 0px;
        width: 21px;
        margin-inline-start: -2px;
        margin-block-start: -5px;
        height: 10px;
        border-width: 2px;
        border-style: solid;
        opacity: 0.85;
        cursor: pointer;
        border-color: dt('colorpicker.handle.color');
    }
`;var ci=["input"],ui=["overlay"],mi=["colorSelector"],fi=["colorHandle"],gi=["hue"],hi=["hueHandle"];function bi(t,o){if(t&1){let e=mI();ai$1(0,"input",9,2),Ip("click",function(){Ul(e);let i=vI();return ql(i.onInputClick())})("keydown",function(i){Ul(e);let r=vI();return ql(r.onInputKeydown(i))})("focus",function(){Ul(e);let i=vI();return ql(i.onInputFocus())}),yc();}if(t&2){let e=vI();BI(e.cx("preview")),Sp("background-color",e.inputBgColor),hp("pAutoFocus",e.autofocus())("pBind",e.ptm("preview")),pp("tabindex",e.tabindex())("disabled",e.disabledAttr())("id",e.inputId())("aria-label",e.ariaLabel());}}function vi(t,o){if(t&1){let e=mI();ai$1(0,"div",10)(1,"div",10)(2,"div",11,3),Ip("touchstart",function(i){Ul(e);let r=vI();return ql(r.onColorDragStart(i))})("touchmove",function(i){Ul(e);let r=vI();return ql(r.onDrag(i))})("touchend",function(){Ul(e);let i=vI();return ql(i.onDragEnd())})("mousedown",function(i){Ul(e);let r=vI();return ql(r.onColorMousedown(i))}),ai$1(4,"div",10),gp(5,"div",10,4),yc()(),ai$1(7,"div",12,5),Ip("mousedown",function(i){Ul(e);let r=vI();return ql(r.onHueMousedown(i))})("touchstart",function(i){Ul(e);let r=vI();return ql(r.onHueDragStart(i))})("touchmove",function(i){Ul(e);let r=vI();return ql(r.onDrag(i))})("touchend",function(){Ul(e);let i=vI();return ql(i.onDragEnd())}),gp(9,"div",10,6),yc()()();}if(t&2){let e=vI();BI(e.cx("panel")),hp("pBind",e.ptm("panel")),Qy(),BI(e.cx("content")),hp("pBind",e.ptm("content")),Qy(),BI(e.cx("colorSelector")),hp("pBind",e.ptm("colorSelector")),Qy(2),BI(e.cx("colorBackground")),hp("pBind",e.ptm("colorBackground")),Qy(),BI(e.cx("colorHandle")),hp("pBind",e.ptm("colorHandle")),Qy(2),BI(e.cx("hue")),hp("pBind",e.ptm("hue")),Qy(2),BI(e.cx("hueHandle")),hp("pBind",e.ptm("hueHandle"));}}var xi={root:({instance:t})=>["p-colorpicker p-component",{"p-colorpicker-overlay":!t.inline(),"p-colorpicker-dragging":t.colorDragging||t.hueDragging}],preview:({instance:t})=>["p-colorpicker-preview",{"p-disabled":t.$disabled()}],panel:({instance:t})=>["p-colorpicker-panel",{"p-colorpicker-panel-inline":t.inline(),"p-disabled":t.$disabled()}],content:"p-colorpicker-content",colorSelector:"p-colorpicker-color-selector",colorBackground:"p-colorpicker-color-background",colorHandle:"p-colorpicker-color-handle",hue:"p-colorpicker-hue",hueHandle:"p-colorpicker-hue-handle"},kn=(()=>{class t extends Y{name="colorpicker";style=Fn;classes=xi;static \u0275fac=(()=>{let e;return function(i){return (e||(e=fm(t)))(i||t)}})();static \u0275prov=re$1({token:t,factory:t.\u0275fac})}return t})();var _i={provide:Wn,useExisting:no$1(()=>In),multi:true},Tn=new C("COLORPICKER_INSTANCE"),In=(()=>{class t extends Yt{componentName="ColorPicker";constructor(){super();}$pcColorPicker=v(Tn,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(k,{self:true});overlayService=v(sm);inline=eL(false,{transform:lL});format=eL("hex");tabindex=eL();inputId=eL();autoZIndex=eL(true,{transform:lL});autofocus=eL(false,{transform:lL});defaultColor=eL("ff0000");appendTo=eL(void 0);overlayOptions=eL(void 0);motionOptions=eL(void 0);onChange=XO();onShow=XO();onHide=XO();inputViewChild=nL("input");overlayViewChild=nL("overlay");colorSelectorViewChild=nL("colorSelector");colorHandleViewChild=nL("colorHandle");hueViewChild=nL("hue");hueHandleViewChild=nL("hueHandle");$appendTo=wD(()=>this.appendTo()||this.config.overlayAppendTo());disabledAttr=wD(()=>this.$disabled()?"":void 0);ariaLabel=wD(()=>this.translate(lm.ARIA,lm.SELECT_COLOR));value={h:0,s:100,b:100};inputBgColor;shown;overlayVisible;documentMousemoveListener;documentMouseupListener;documentHueMoveListener;scrollHandler;colorDragging;hueDragging;overlay;_componentStyle=v(kn);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}onHueMousedown(e){this.$disabled()||(this.bindDocumentMousemoveListener(),this.bindDocumentMouseupListener(),this.hueDragging=true,this.pickHue(e));}onHueDragStart(e){this.$disabled()||(this.hueDragging=true,this.pickHue(e,e.changedTouches[0]));}onColorDragStart(e){this.$disabled()||(this.colorDragging=true,this.pickColor(e,e.changedTouches[0]),this.el.nativeElement.setAttribute("p-colorpicker-dragging","true"));}pickHue(e,n){let i=n?n.pageY:e.pageY,r=this.hueViewChild()?.nativeElement.getBoundingClientRect().top+(this.document.defaultView.pageYOffset||this.document.documentElement.scrollTop||this.document.body.scrollTop||0);this.value=this.validateHSB({h:Math.floor(360*(150-Math.max(0,Math.min(150,i-r)))/150),s:this.value.s,b:this.value.b}),this.updateColorSelector(),this.updateUI(),this.updateModel(),this.onChange.emit({originalEvent:e,value:this.getValueToUpdate()});}onColorMousedown(e){this.$disabled()||(this.bindDocumentMousemoveListener(),this.bindDocumentMouseupListener(),this.colorDragging=true,this.pickColor(e));}onDrag(e){this.colorDragging&&(this.pickColor(e,e.changedTouches[0]),e.preventDefault()),this.hueDragging&&(this.pickHue(e,e.changedTouches[0]),e.preventDefault());}onDragEnd(){this.colorDragging=false,this.hueDragging=false,this.el.nativeElement.setAttribute("p-colorpicker-dragging","false"),this.unbindDocumentMousemoveListener(),this.unbindDocumentMouseupListener();}pickColor(e,n){let i=n?n.pageX:e.pageX,r=n?n.pageY:e.pageY,u=this.colorSelectorViewChild()?.nativeElement.getBoundingClientRect(),C=u.top+(this.document.defaultView.pageYOffset||this.document.documentElement.scrollTop||this.document.body.scrollTop||0),S=u.left+this.document.body.scrollLeft,F=Math.floor(100*Math.max(0,Math.min(150,i-S))/150),Z=Math.floor(100*(150-Math.max(0,Math.min(150,r-C)))/150);this.value=this.validateHSB({h:this.value.h,s:F,b:Z}),this.updateUI(),this.updateModel(),this.onChange.emit({originalEvent:e,value:this.getValueToUpdate()});}getValueToUpdate(){let e;switch(this.format()){case "hex":e="#"+this.HSBtoHEX(this.value);break;case "rgb":e=this.HSBtoRGB(this.value);break;case "hsb":e=this.value;break}return e}updateModel(){this.onModelChange(this.getValueToUpdate());}updateColorSelector(){let e=this.colorSelectorViewChild();if(e){let n={};n.s=100,n.b=100,n.h=this.value.h,e.nativeElement.style.backgroundColor="#"+this.HSBtoHEX(n);}}updateUI(){let e=this.colorHandleViewChild(),n=this.hueHandleViewChild();e&&n?.nativeElement&&(e.nativeElement.style.left=Math.floor(150*this.value.s/100)+"px",e.nativeElement.style.top=Math.floor(150*(100-this.value.b)/100)+"px",n.nativeElement.style.top=Math.floor(150-150*this.value.h/360)+"px"),this.inputBgColor="#"+this.HSBtoHEX(this.value);}onInputFocus(){this.onModelTouched();}show(){this.overlayVisible=true;}onOverlayBeforeEnter(){this.inline()||(this.updateColorSelector(),this.updateUI(),this.onShow.emit({}));}onOverlayAfterLeave(){this.inline()||this.onHide.emit({});}hide(){this.overlayVisible=false;}onInputClick(){this.togglePanel();}togglePanel(){this.overlayVisible?this.hide():this.show();}onInputKeydown(e){switch(e.code){case "Space":this.togglePanel(),e.preventDefault();break;case "Escape":case "Tab":this.hide();break;}}onOverlayClick(e){this.overlayService.add({originalEvent:e,target:this.el.nativeElement});}bindDocumentMousemoveListener(){if(!this.documentMousemoveListener){let e=this.el?this.el.nativeElement.ownerDocument:"document";this.documentMousemoveListener=this.renderer.listen(e,"mousemove",n=>{this.colorDragging&&this.pickColor(n),this.hueDragging&&this.pickHue(n);});}}unbindDocumentMousemoveListener(){this.documentMousemoveListener&&(this.documentMousemoveListener(),this.documentMousemoveListener=null);}bindDocumentMouseupListener(){if(!this.documentMouseupListener){let e=this.el?this.el.nativeElement.ownerDocument:"document";this.documentMouseupListener=this.renderer.listen(e,"mouseup",()=>{this.colorDragging=false,this.hueDragging=false,this.unbindDocumentMousemoveListener(),this.unbindDocumentMouseupListener();});}}unbindDocumentMouseupListener(){this.documentMouseupListener&&(this.documentMouseupListener(),this.documentMouseupListener=null);}validateHSB(e){return {h:Math.min(360,Math.max(0,e.h)),s:Math.min(100,Math.max(0,e.s)),b:Math.min(100,Math.max(0,e.b))}}validateRGB(e){return {r:Math.min(255,Math.max(0,e.r)),g:Math.min(255,Math.max(0,e.g)),b:Math.min(255,Math.max(0,e.b))}}validateHEX(e){var n=6-e.length;if(n>0){for(var i=[],r=0;r<n;r++)i.push("0");i.push(e),e=i.join("");}return e}HEXtoRGB(e){if(!e||typeof e!="string")return {r:0,g:0,b:0};let n=parseInt(e.indexOf("#")>-1?e.substring(1):e,16);return {r:n>>16,g:(n&65280)>>8,b:n&255}}HEXtoHSB(e){return this.RGBtoHSB(this.HEXtoRGB(e))}RGBtoHSB(e){var n={h:0,s:0,b:0},i=Math.min(e.r,e.g,e.b),r=Math.max(e.r,e.g,e.b),u=r-i;return n.b=r,n.s=r!=0?255*u/r:0,n.s!=0?e.r==r?n.h=(e.g-e.b)/u:e.g==r?n.h=2+(e.b-e.r)/u:n.h=4+(e.r-e.g)/u:n.h=-1,n.h*=60,n.h<0&&(n.h+=360),n.s*=100/255,n.b*=100/255,n}HSBtoRGB(e){var n={r:0,g:0,b:0};let i=e.h,r=e.s*255/100,u=e.b*255/100;if(r==0)n={r:u,g:u,b:u};else {let C=u,S=(255-r)*u/255,F=(C-S)*(i%60)/60;i==360&&(i=0),i<60?(n.r=C,n.b=S,n.g=S+F):i<120?(n.g=C,n.b=S,n.r=C-F):i<180?(n.g=C,n.r=S,n.b=S+F):i<240?(n.b=C,n.r=S,n.g=C-F):i<300?(n.b=C,n.g=S,n.r=S+F):i<360?(n.r=C,n.g=S,n.b=C-F):(n.r=0,n.g=0,n.b=0);}return {r:Math.round(n.r),g:Math.round(n.g),b:Math.round(n.b)}}RGBtoHEX(e){var n=[e.r.toString(16),e.g.toString(16),e.b.toString(16)];for(var i in n)n[i].length==1&&(n[i]="0"+n[i]);return n.join("")}HSBtoHEX(e){return this.RGBtoHEX(this.HSBtoRGB(e))}onAfterViewInit(){this.inline()&&(this.updateColorSelector(),this.updateUI());}writeControlValue(e,n){if(e)switch(this.format()){case "hex":this.value=this.HEXtoHSB(e);break;case "rgb":this.value=this.RGBtoHSB(e);break;case "hsb":this.value=e;break}else this.value=this.HEXtoHSB(this.defaultColor());n?.(e),this.updateColorSelector(),this.updateUI(),this.cd.markForCheck();}onDestroy(){this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null);let e=this.overlayViewChild()?.nativeElement;e&&this.autoZIndex()&&fe.clear(e);}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=SE({type:t,selectors:[["p-colorpicker"],["p-color-picker"]],viewQuery:function(n,i){n&1&&Cp$1(i.inputViewChild,ci,5)(i.overlayViewChild,ui,5)(i.colorSelectorViewChild,mi,5)(i.colorHandleViewChild,fi,5)(i.hueViewChild,gi,5)(i.hueHandleViewChild,hi,5),n&2&&bI(6);},hostVars:2,hostBindings:function(n,i){n&2&&BI(i.cx("root"));},inputs:{inline:[1,"inline"],format:[1,"format"],tabindex:[1,"tabindex"],inputId:[1,"inputId"],autoZIndex:[1,"autoZIndex"],autofocus:[1,"autofocus"],defaultColor:[1,"defaultColor"],appendTo:[1,"appendTo"],overlayOptions:[1,"overlayOptions"],motionOptions:[1,"motionOptions"]},outputs:{onChange:"onChange",onShow:"onShow",onHide:"onHide"},features:[iD([_i,kn,{provide:Tn,useExisting:t},{provide:ee,useExisting:t}]),VE([k]),ap],decls:5,vars:10,consts:[["overlay",""],["content",""],["input",""],["colorSelector",""],["colorHandle",""],["hue",""],["hueHandle",""],["type","text","readonly","",3,"class","backgroundColor","pAutoFocus","pBind"],[3,"visibleChange","onBeforeEnter","onAfterLeave","onHide","hostAttrSelector","visible","options","target","inline","appendTo","unstyled","pt","motionOptions"],["type","text","readonly","",3,"click","keydown","focus","pAutoFocus","pBind"],[3,"pBind"],[3,"touchstart","touchmove","touchend","mousedown","pBind"],[3,"mousedown","touchstart","touchmove","touchend","pBind"]],template:function(n,i){if(n&1){let r=mI();iI(0,bi,2,10,"input",7),ai$1(1,"p-overlay",8,0),$p("visibleChange",function(C){return Ul(r),tD(i.overlayVisible,C)||(i.overlayVisible=C),ql(C)}),Ip("onBeforeEnter",function(){return i.onOverlayBeforeEnter()})("onAfterLeave",function(){return i.onOverlayAfterLeave()})("onHide",function(){return i.hide()}),lp(3,vi,11,21,"ng-template",null,1,ED),yc();}n&2&&(sI(i.inline()?-1:0),Qy(),hp("hostAttrSelector",i.$attrSelector),Bp("visible",i.overlayVisible),hp("options",i.overlayOptions())("target","@parent")("inline",i.inline())("appendTo",i.$appendTo())("unstyled",i.unstyled())("pt",i.ptm("pcOverlay"))("motionOptions",i.motionOptions()));},dependencies:[ys,Be,k,oi$1],encapsulation:2})}return t})(),Vn=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=AE({type:t});static \u0275inj=El({imports:[In,Be,Be]})}return t})();var yi=(t,o)=>o.key;function Ci(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function Di(t,o){if(t&1&&(ai$1(0,"span",3),lI(1,Ci,1,1,null,null,yi),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var Xe=class t{field=eL.required();control=eL.required();static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-color-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:5,vars:5,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],["ColorFieldInput","",1,"rounded-md","px-3","py-2","w-full","border","border-surface-300","text-[0.9375rem]","focus:border-primary","focus:outline-none","dark:border-surface-600",3,"id","formControl"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),gp(3,"input",2),jv(),iI(4,Di,4,2,"span",3),yc()),e&2&&(Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),hp("id",n.field().name)("formControl",n.control()),Hv(),Qy(),sI(n.control().invalid&&n.control().touched?4:-1));},dependencies:[u0,Ps,i0,Bc,Vn,pl],encapsulation:2})};var Mi=(t,o)=>o.key;function wi(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function Fi(t,o){if(t&1&&(ai$1(0,"span",3),lI(1,wi,1,1,null,null,Mi),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var Ye=class t{field=eL.required();control=eL.required();static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-date-range-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:5,vars:6,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],["selectionMode","range","styleClass","w-full",3,"inputId","readonlyInput","formControl"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),gp(3,"p-datepicker",2),jv(),iI(4,Fi,4,2,"span",3),yc()),e&2&&(Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),hp("inputId",n.field().name)("readonlyInput",true)("formControl",n.control()),Hv(),Qy(),sI(n.control().invalid&&n.control().touched?4:-1));},dependencies:[u0,i0,Bc,fa,At,pl],encapsulation:2})};var ki=(t,o)=>o.key;function Ti(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function Ii(t,o){if(t&1&&(ai$1(0,"span",3),lI(1,Ti,1,1,null,null,ki),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var We=class t{field=eL.required();control=eL.required();timeOnly=wD(()=>this.field().type==="time");showTime=wD(()=>this.field().type==="date-time");static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-date-time-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:5,vars:7,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],["styleClass","w-full",3,"inputId","timeOnly","showTime","formControl"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),gp(3,"p-datepicker",2),jv(),iI(4,Ii,4,2,"span",3),yc()),e&2&&(Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),hp("inputId",n.field().name)("timeOnly",n.timeOnly())("showTime",n.showTime())("formControl",n.control()),Hv(),Qy(),sI(n.control().invalid&&n.control().touched?4:-1));},dependencies:[u0,i0,Bc,fa,At,pl],encapsulation:2})};var Vi=(t,o)=>o.key;function Ei(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function Ni(t,o){if(t&1&&(ai$1(0,"span",4),lI(1,Ei,1,1,null,null,Vi),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var Ze=class t{field=eL.required();control=eL.required();static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-checkbox-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:6,vars:6,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"gap-2","flex","items-center"],[3,"inputId","binary","formControl"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"div",1),gp(2,"p-checkbox",2),jv(),ai$1(3,"label",3),KI(4),yc()(),iI(5,Ni,4,2,"span",4),yc()),e&2&&(Qy(2),hp("inputId",n.field().name)("binary",true)("formControl",n.control()),Hv(),Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),sI(n.control().invalid&&n.control().touched?5:-1));},dependencies:[u0,i0,Bc,Ao,Ft,pl],encapsulation:2})};var En=(t,o)=>o.key;function Bi(t,o){if(t&1&&(ai$1(0,"div",3),gp(1,"p-radiobutton",5),jv(),ai$1(2,"label",6),KI(3),yc()()),t&2){let e=o.$implicit,n=vI();Qy(),hp("inputId",n.field().name+"-"+e.key)("value",e.key)("formControl",n.control())("name",n.field().name),Hv(),Qy(),hp("for",n.field().name+"-"+e.key),Qy(),jp(e.value);}}function Hi(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function Pi(t,o){if(t&1&&(ai$1(0,"span",4),lI(1,Hi,1,1,null,null,En),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var Je=class t{field=eL.required();control=eL.required();options=wD(()=>(this.field().options??[]).map(e=>typeof e=="string"?{key:e,value:e}:e));static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-radio-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:7,vars:2,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300"],[1,"gap-2","flex","flex-col"],[1,"gap-2","flex","items-center"],[1,"text-red-600","dark:text-red-400","text-[13px]"],[3,"inputId","value","formControl","name"],[1,"text-sm","text-surface-700","dark:text-surface-300",3,"for"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),ai$1(3,"div",2),lI(4,Bi,4,6,"div",3,En),yc(),iI(6,Pi,4,2,"span",4),yc()),e&2&&(Qy(2),jp(n.field().label),Qy(2),uI(n.options()),Qy(2),sI(n.control().invalid&&n.control().touched?6:-1));},dependencies:[u0,i0,Bc,fo$1,Vt,pl],encapsulation:2})};var Ai=(t,o)=>o.key;function Ri(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function Li(t,o){if(t&1&&(ai$1(0,"span",3),lI(1,Ri,1,1,null,null,Ai),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var et=class t{field=eL.required();control=eL.required();options=wD(()=>(this.field().options??[]).map(e=>typeof e=="string"?{key:e,value:e}:e));static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-select-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:5,vars:6,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],["optionLabel","value","optionValue","key","placeholder","Select...","styleClass","w-full",3,"inputId","options","formControl"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),gp(3,"p-select",2),jv(),iI(4,Li,4,2,"span",3),yc()),e&2&&(Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),hp("inputId",n.field().name)("options",n.options())("formControl",n.control()),Hv(),Qy(),sI(n.control().invalid&&n.control().touched?4:-1));},dependencies:[u0,i0,Bc,Ol,ui$1,pl],encapsulation:2})};var $i=(t,o)=>o.key;function Oi(t,o){if(t&1&&KI(0),t&2){let e=o.$implicit;Tc(" ",e.value," ");}}function zi(t,o){if(t&1&&(ai$1(0,"span",3),lI(1,Oi,1,1,null,null,$i),gD(3,"keyvalue"),yc()),t&2){let e=vI();Qy(),uI(yD(3,0,e.control().errors));}}var tt=class t{field=eL.required();control=eL.required();static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-textarea-field-input"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:5,vars:5,consts:[[1,"mb-4","gap-1.5","flex","flex-col"],[1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300",3,"for"],["pTextarea","","rows","3",1,"w-full",3,"id","formControl"],[1,"text-red-600","dark:text-red-400","text-[13px]"]],template:function(e,n){e&1&&(ai$1(0,"div",0)(1,"label",1),KI(2),yc(),gp(3,"textarea",2),jv(),iI(4,zi,4,2,"span",3),yc()),e&2&&(Qy(),hp("for",n.field().name),Qy(),jp(n.field().label),Qy(),hp("id",n.field().name)("formControl",n.control()),Hv(),Qy(),sI(n.control().invalid&&n.control().touched?4:-1));},dependencies:[u0,Ps,i0,Bc,na$1,ia,pl],encapsulation:2})};function ji(t,o){if(t&1&&gp(0,"app-simple-text-input",0),t&2){let e=vI();hp("field",e.field())("control",e.control())("inputType",o);}}function Gi(t,o){if(t&1&&gp(0,"app-textarea-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}function qi(t,o){if(t&1&&gp(0,"app-select-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}function Ui(t,o){if(t&1&&gp(0,"app-radio-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}function Ki(t,o){if(t&1&&gp(0,"app-checkbox-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}function Qi(t,o){if(t&1&&gp(0,"app-date-time-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}function Xi(t,o){if(t&1&&gp(0,"app-date-range-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}function Yi(t,o){if(t&1&&gp(0,"app-color-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}function Wi(t,o){if(t&1&&gp(0,"app-range-field-input",1),t&2){let e=vI();hp("field",e.field())("control",e.control());}}var Zi={text:"text",password:"password",email:"email",number:"number",tel:"tel",url:"url"},Ji=new Set(["date","time","date-time"]),nt=class t{field=eL.required();control=eL.required();FieldTypeEnum=$a;get simpleInputType(){return Zi[this.field().type]??null}get isDateTimeType(){return Ji.has(this.field().type)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-dynamic-field"]],inputs:{field:[1,"field"],control:[1,"control"]},decls:9,vars:1,consts:[[3,"field","control","inputType"],[3,"field","control"]],template:function(e,n){if(e&1&&iI(0,ji,1,3,"app-simple-text-input",0)(1,Gi,1,2,"app-textarea-field-input",1)(2,qi,1,2,"app-select-field-input",1)(3,Ui,1,2,"app-radio-field-input",1)(4,Ki,1,2,"app-checkbox-field-input",1)(5,Qi,1,2,"app-date-time-field-input",1)(6,Xi,1,2,"app-date-range-field-input",1)(7,Yi,1,2,"app-color-field-input",1)(8,Wi,1,2,"app-range-field-input",1),e&2){let i;sI((i=n.simpleInputType)?0:n.field().type===n.FieldTypeEnum.Textarea?1:n.field().type===n.FieldTypeEnum.Select?2:n.field().type===n.FieldTypeEnum.Radio?3:n.field().type===n.FieldTypeEnum.Checkbox?4:n.isDateTimeType?5:n.field().type===n.FieldTypeEnum.DateRange?6:n.field().type===n.FieldTypeEnum.Color?7:n.field().type===n.FieldTypeEnum.Range?8:-1,i);}},dependencies:[Ue,tt,et,Je,Ze,We,Ye,Xe,Qe],encapsulation:2})};var it=class t$1{getFormByIdUseCase=v(t);submitFormUseCase=v(e);authState=v(na);_form=bo(null);_alreadySubmitted=bo(false);form=this._form.asReadonly();alreadySubmitted=this._alreadySubmitted.asReadonly();loadForm(o){return v$1(this,null,function*(){let e=yield this.getFormByIdUseCase.execute(o);this._form.set(e);})}submitForm(o){return v$1(this,null,function*(){let e=this._form();if(!e)throw new Error("No form loaded.");let n=yield this.submitFormUseCase.execute(e.id,this.getCurrentUserId(),o);return this._alreadySubmitted.set(true),n})}getCurrentUserId(){let o=this.authState.currentUser()?.id;if(!o)throw new Error("User is not authenticated.");return o}static \u0275fac=function(e){return new(e||t$1)};static \u0275prov=Pt({token:t$1,factory:t$1.\u0275fac})};var eo={requiredIfFilled:$o,dateAfter:jo,dateBefore:Uo};function Nn(t,o){return e=>{let n=o.find(S=>S.id===t.targetFieldId),i=o.find(S=>S.id===t.dependsOnFieldId);if(!n||!i)return null;let r=e.get(n.name)?.value,u=e.get(i.name)?.value;return eo[t.type](r,u)?null:{[t.type]:t.message}}}var to={required:t=>Wo(t),minLength:(t,o)=>Go(t,o),maxLength:(t,o)=>zo(t,o),pattern:(t,o)=>qo$1(t,o),minValue:(t,o)=>Ko(t,o),maxValue:(t,o)=>Yo(t,o),email:t=>Zo(t)};function Bn(t){return o=>to[t.type](o.value,t.value)?null:{[t.type]:t.message}}var ot=class t{buildPageGroups(o){let e=o.pages.flatMap(n=>n.fields);return o.pages.map(n=>this.buildPageGroup(n,e,o))}buildPageGroup(o,e,n){let i={};for(let C of o.fields){let S=C.validators.map(Bn);i[C.name]=new jt(null,S);}let r=new Hn$1(i),u=o.validators.map(C=>Nn(C,e));return r.setValidators(u),r}static \u0275fac=function(e){return new(e||t)};static \u0275prov=Pt({token:t,factory:t.\u0275fac})};var gt=(t,o)=>o.id;function no(t,o){t&1&&gp(0,"app-already-submitted-banner");}function io(t,o){if(t&1&&(ai$1(0,"p",4),KI(1),yc()),t&2){let e=vI();Qy(),jp(e.description);}}function oo(t,o){if(t&1&&(ai$1(0,"p-step",6),KI(1),yc()),t&2){let e=o.$implicit,n=o.$index;hp("value",n+1),Qy(),jp(e.title);}}function ro(t,o){if(t&1&&gp(0,"app-dynamic-field",9),t&2){let e=o.$implicit,n=vI(2).$index,i=vI(2);hp("field",e)("control",i.pageGroups()[n].get(e.name));}}function ao(t,o){if(t&1){let e=mI();ai$1(0,"button",14),Ip("click",function(){Ul(e);let i=vI().$implicit,r=vI().$index,u=vI(2);return ql(u.goToStep(r,i))}),KI(1,"Back"),yc();}t&2&&hp("text",true);}function lo(t,o){if(t&1){let e=mI();ai$1(0,"button",15),Ip("click",function(){Ul(e);let i=vI().$implicit,r=vI().$index,u=vI(2);return ql(u.goToStep(r+2,i))}),KI(1,"Next"),yc();}t&2&&hp("text",true);}function so(t,o){if(t&1){let e=mI();ai$1(0,"button",16),Ip("click",function(){Ul(e);let i=vI(4);return ql(i.onSubmit())}),KI(1,"Submit"),yc();}if(t&2){let e=vI(4);hp("text",true)("loading",e.isSubmitting());}}function po(t,o){if(t&1&&(ai$1(0,"form",8),lI(1,ro,1,2,"app-dynamic-field",9,gt),yc(),ai$1(3,"div",10),iI(4,ao,2,1,"button",11),iI(5,lo,2,1,"button",12)(6,so,2,2,"button",13),yc()),t&2){let e=vI(),n=e.$implicit,i=e.$index,r=vI(2);hp("formGroup",r.pageGroups()[i]),Qy(),uI(n.fields),Qy(3),sI(i>0?4:-1),Qy(),sI(r.isLastStep()?6:5);}}function co(t,o){if(t&1&&(ai$1(0,"p-step-panel",6),lp(1,po,7,3,"ng-template",null,0,ED),yc()),t&2){let e=o.$index;hp("value",e+1);}}function uo(t,o){t&1&&(ai$1(0,"p",7),KI(1),yc()),t&2&&(Qy(),jp(o));}function mo(t,o){if(t&1&&(ai$1(0,"div",1)(1,"h2",3),KI(2),yc(),iI(3,io,2,1,"p",4),ai$1(4,"p-stepper",5)(5,"p-step-list"),lI(6,oo,2,2,"p-step",6,gt),yc(),ai$1(8,"p-step-panels"),lI(9,co,3,1,"p-step-panel",6,gt),yc()(),iI(11,uo,2,1,"p",7),yc()),t&2){let e,n=o,i=vI();Qy(2),jp(n.title),Qy(),sI(n.description?3:-1),Qy(),hp("value",i.activeStep()),Qy(2),uI(n.pages),Qy(3),uI(n.pages),Qy(2),sI((e=i.submitError())?11:-1,e);}}function fo(t,o){t&1&&(ai$1(0,"div",2),KI(1,"Loading form..."),yc());}var Hn=class t{id=eL.required();facade=v(it);formBuilder=v(ot);form=this.facade.form;alreadySubmitted=this.facade.alreadySubmitted;pageGroups=bo([]);activeStep=bo(1);isSubmitting=bo(false);submitError=bo(null);isLastStep=wD(()=>this.activeStep()===this.pageGroups().length);constructor(){pu(()=>{let o=this.id();o&&this.facade.loadForm(o).then(()=>{let e=this.form();e&&this.pageGroups.set(this.formBuilder.buildPageGroups(e));});});}goToStep(o,e){let n=this.pageGroups()[this.activeStep()-1];n?.markAllAsTouched(),!(o>this.activeStep()&&n?.invalid)&&(this.activeStep.set(o),e(o));}onSubmit(){return v$1(this,null,function*(){let o=this.pageGroups();if(o.forEach(n=>n.markAllAsTouched()),o.some(n=>n.invalid)){this.submitError.set("Please fix the errors before submitting.");return}let e={};for(let n of o)Object.assign(e,n.getRawValue());this.isSubmitting.set(true),this.submitError.set(null);try{yield this.facade.submitForm(e);}catch(n){this.submitError.set(n instanceof Error?n.message:"Submission failed.");}finally{this.isSubmitting.set(false);}})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=SE({type:t,selectors:[["app-form-renderer"]],inputs:{id:[1,"id"]},decls:3,vars:1,consts:[["content",""],[1,"mx-auto","max-w-2xl","p-6"],[1,"flex","items-center","justify-center","p-12","text-surface-400","dark:text-surface-500"],[1,"text-xl","font-semibold","text-surface-900","dark:text-surface-0"],[1,"mb-6","text-surface-500","dark:text-surface-400"],[1,"min-w-0",3,"value"],[3,"value"],[1,"mt-4","text-red-600","dark:text-red-400"],[1,"flex","flex-col","py-6",3,"formGroup"],[3,"field","control"],[1,"flex","justify-between","pt-4"],["pButton","","type","button","severity","secondary",3,"text"],["pButton","","type","button",3,"text"],["pButton","","type","button",3,"text","loading"],["pButton","","type","button","severity","secondary",3,"click","text"],["pButton","","type","button",3,"click","text"],["pButton","","type","button",3,"click","text","loading"]],template:function(e,n){if(e&1&&iI(0,no,1,0,"app-already-submitted-banner")(1,mo,12,4,"div",1)(2,fo,2,0,"div",2),e&2){let i;sI(n.alreadySubmitted()?0:(i=n.form())?1:2,i);}},dependencies:[u0,s0,o0,Hc,Rb,Pb,Cn,ft,Te,mt,ke,re,qe,nt],encapsulation:2})};export{Hn as FormRenderer};