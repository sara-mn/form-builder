import {C,S}from'./chunk-DXDGm4f9.js';import {k as kn,P as Pn,e as et,I as In,S as Sn,c as cn,u as un,o as oi,r as ri,R as Rn,g as ge}from'./chunk-B6H_IJkC.js';import {v,b as bo,A as AE,q as qp,Z as Zp,i as ai,j as XI,y as yc,c5 as qp$1,T as Tp,B as mp,D as Hv,c as aI,K as Ky,c6 as Up,m as gp,$ as $v,d as cI,P as Pt$1,cZ as o,c_ as t,c$ as i,g as A,_ as kE,a0 as El,b2 as Ad,a2 as J,a3 as C$1,a4 as N,a7 as tL,e as eL,a5 as lL,a6 as uL,aa as Ai,aF as hm,ah as cp,ai as TI,aO as wI,z as aD,aj as pe,ak as BE,aL as hp,N as UI,bo as no,a8 as rL,f as bD,aS as rt$1,af as bn,E as up,d0 as Ip,al as bp,am as _I,an as nL,p as pu,at as $t,b6 as hn,cW as ur,aW as Na,cw as P,cx as B,d1 as Zd,b9 as qt$1,a1 as Ut$1,aD as Mp,bF as lr,d2 as Pa,aI as Ma,aE as G,aG as oe,I as vI,J as II,M as ru,U as Ul,L as ql,Y as DD,cl as rD,br as NI,aQ as Ep}from'./main-PNY5AZRY.js';var se=class t$1{getProfileUseCase=v(o);updateProfileUseCase=v(t);changePasswordUseCase=v(i);authState=v(A);getProfile(){return this.getProfileUseCase.execute()}updateProfile(o){return this.updateProfileUseCase.execute(o).then(e=>(this.authState.setUser(e),e))}changePassword(o){return this.changePasswordUseCase.execute(o)}static \u0275fac=function(e){return new(e||t$1)};static \u0275prov=Pt$1({token:t$1,factory:t$1.\u0275fac})};var le=class t{formBuilder=v(Rn);passwordsMatchValidator=o=>{let e=o.get("newPassword")?.value,a=o.get("confirmPassword")?.value;return e===a?null:{passwordMismatch:true}};createProfileForm(){return this.formBuilder.nonNullable.group({name:["",[ge.required]],mobile:["",[ge.required]]})}createChangePasswordForm(){return this.formBuilder.nonNullable.group({currentPassword:["",[ge.required]],newPassword:["",[ge.required,ge.minLength(6)]],confirmPassword:["",[ge.required]]},{validators:this.passwordsMatchValidator})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=Pt$1({token:t,factory:t.\u0275fac})};var ot={toDomain(t){return {name:t.name,mobile:t.mobile}}};var rt={toDomain(t){return {currentPassword:t.currentPassword,newPassword:t.newPassword}}};var st=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        overflow: hidden;
        display: flex;
        position: relative;
        background: dt('tabs.tablist.background');
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        position: relative;
        display: flex;
        flex-grow: 1;
        min-height: 0;
        overflow-x: auto;
        overflow-y: clip;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-content::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        font-size: dt('tabs.tab.font.size');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        background: dt('tabs.active.bar.background');
        transition: width 250ms cubic-bezier(0.35, 0, 0.25, 1), inset-inline-start 250ms cubic-bezier(0.35, 0, 0.25, 1);
        inset-inline-start: var(--px-active-bar-left);
        inset-block-end: dt('tabs.active.bar.bottom');
        width: var(--px-active-bar-width);
        height: dt('tabs.active.bar.height');
    }
`;var X=["*"],xt=["previcon"],_t=["nexticon"],ht=["content"],Ct=["prevButton"],Pt=["nextButton"],Ft=["inkbar"];function Bt(t,o){t&1&&Ep(0);}function Mt(t,o){if(t&1&&up(0,Bt,1,0,"ng-container",9),t&2){let e=II(2);gp("ngTemplateOutlet",e.prevIconTemplate());}}function Dt(t,o){t&1&&(ru(),mp(0,"svg",8));}function Nt(t,o){if(t&1){let e=vI();ai(0,"button",7,2),Tp("click",function(){Ul(e);let n=II();return ql(n.onPrevButtonClick())}),aI(2,Mt,1,1,"ng-container")(3,Dt,1,0,":svg:svg",8),yc();}if(t&2){let e=II();UI(e.cx("prevButton")),gp("pBind",e.ptm("prevButton")),hp("aria-label",e.prevButtonAriaLabel)("tabindex",e.tabindex())("data-pc-group-section","navigator"),Ky(2),cI(e.prevIconTemplate()?2:3);}}function St(t,o){t&1&&Ep(0);}function kt(t,o){if(t&1&&up(0,St,1,0,"ng-container",9),t&2){let e=II(2);gp("ngTemplateOutlet",e.nextIconTemplate());}}function Et(t,o){t&1&&(ru(),mp(0,"svg",10));}function At(t,o){if(t&1){let e=vI();ai(0,"button",7,3),Tp("click",function(){Ul(e);let n=II();return ql(n.onNextButtonClick())}),aI(2,kt,1,1,"ng-container")(3,Et,1,0,":svg:svg",10),yc();}if(t&2){let e=II();UI(e.cx("nextButton")),gp("pBind",e.ptm("nextButton")),hp("aria-label",e.nextButtonAriaLabel)("tabindex",e.tabindex())("data-pc-group-section","navigator"),Ky(2),cI(e.nextIconTemplate()?2:3);}}function It(t,o){t&1&&wI(0);}function Lt(t,o){t&1&&Ep(0);}function Vt(t,o){if(t&1&&up(0,Lt,1,0,"ng-container",1),t&2){let e=II(),a=NI(1);gp("ngTemplateOutlet",e.content()?e.content():a);}}var Rt={root:"p-tabs p-component"},lt=(()=>{class t extends G{name="tabs";style=st;classes=Rt;static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275prov=oe({token:t,factory:t.\u0275fac})}return t})();var dt=new C$1("TABS_INSTANCE"),W=(()=>{class t extends J{componentName="Tabs";$pcTabs=v(dt,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(N,{self:true});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}value=tL(void 0);scrollable=eL(false,{transform:lL});lazy=eL(false,{transform:lL});selectOnFocus=eL(false,{transform:lL});showNavigators=eL(true,{transform:lL});tabindex=eL(0,{transform:uL});scrollStrategy=eL("nearest");id=bo(Ai("pn_id_"));_componentStyle=v(lt);updateValue(e){this.value.update(()=>e);}static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275cmp=AE({type:t,selectors:[["p-tabs"]],hostVars:3,hostBindings:function(a,n){a&2&&(hp("id",n.id()),UI(n.cx("root")));},inputs:{value:[1,"value"],scrollable:[1,"scrollable"],lazy:[1,"lazy"],selectOnFocus:[1,"selectOnFocus"],showNavigators:[1,"showNavigators"],tabindex:[1,"tabindex"],scrollStrategy:[1,"scrollStrategy"]},outputs:{value:"valueChange"},features:[aD([lt,{provide:dt,useExisting:t},{provide:pe,useExisting:t}]),BE([N]),cp],ngContentSelectors:X,decls:1,vars:0,template:function(a,n){a&1&&(TI(),wI(0));},dependencies:[Ad],encapsulation:2})}return t})(),Ot={root:({instance:t})=>["p-tab",{"p-tab-active":t.active(),"p-disabled":t.disabled()}]},ct=(()=>{class t extends G{name="tab";classes=Ot;static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275prov=oe({token:t,factory:t.\u0275fac})}return t})();var zt={root:"p-tablist",content:"p-tablist-content",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},ut=(()=>{class t extends G{name="tablist";classes=zt;static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275prov=oe({token:t,factory:t.\u0275fac})}return t})();var pt=new C$1("TABLIST_INSTANCE"),de=(()=>{class t extends J{componentName="TabList";$pcTabList=v(pt,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(N,{self:true});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}prevIconTemplate=rL("previcon",{descendants:false});nextIconTemplate=rL("nexticon",{descendants:false});content=nL("content");prevButton=nL("prevButton");nextButton=nL("nextButton");inkbar=nL("inkbar");pcTabs=v(no(()=>W));isPrevButtonEnabled=bo(false);isNextButtonEnabled=bo(false);resizeObserver;showNavigators=bD(()=>this.pcTabs.showNavigators());tabindex=bD(()=>this.pcTabs.tabindex());scrollable=bD(()=>this.pcTabs.scrollable());_componentStyle=v(ut);constructor(){super(),pu(()=>{this.pcTabs.value(),$t(this.platformId)&&setTimeout(()=>{this.updateInkBar(),this.scrollToActiveTab();});});}get prevButtonAriaLabel(){return this.config?.translation?.aria?.previous}get nextButtonAriaLabel(){return this.config?.translation?.aria?.next}onAfterViewInit(){this.showNavigators()&&$t(this.platformId)&&(this.updateButtonState(),this.bindResizeObserver());}onDestroy(){this.unbindResizeObserver();}onScroll(e){this.showNavigators()&&this.updateButtonState(),e.preventDefault();}onPrevButtonClick(){let e=this.content()?.nativeElement;if(!e)return;let a=hn(e),n=Math.abs(e.scrollLeft)-a,i=n<=0?0:n;e.scrollLeft=ur(e)?-1*i:i;}onNextButtonClick(){let e=this.content()?.nativeElement;if(!e)return;let a=hn(e)-this.getVisibleButtonWidths(),n=e.scrollLeft+a,i=e.scrollWidth-a,c=n>=i?i:n;e.scrollLeft=ur(e)?-1*c:c;}updateButtonState(){let e=this.content()?.nativeElement,a=this.el?.nativeElement;if(!e)return;let{scrollWidth:n,offsetWidth:i}=e,c=Math.abs(e.scrollLeft),D=hn(e);this.isPrevButtonEnabled.set(c!==0),this.isNextButtonEnabled.set(a.offsetWidth>=i&&Math.abs(c-n+D)>1);}updateInkBar(){let e=this.content()?.nativeElement,a=this.inkbar()?.nativeElement;if(!e||!a)return;let n=Na(e,'[data-pc-name="tab"][data-p-active="true"]');n&&(a.style.setProperty("--px-active-bar-width",n.offsetWidth+"px"),a.style.setProperty("--px-active-bar-height",n.offsetHeight+"px"),a.style.setProperty("--px-active-bar-left",n.offsetLeft+"px"),a.style.setProperty("--px-active-bar-top",n.offsetTop+"px"));}scrollToActiveTab(){let e=this.content()?.nativeElement,a=this.pcTabs.scrollStrategy();if(!e||a===false)return;let n=Na(e,'[data-pc-name="tab"][data-p-active="true"]');if(!n)return;let i=e.clientWidth,c=Math.abs(e.scrollLeft),D=n.offsetLeft,Ce=n.offsetWidth,Pe=D+Ce,Y;if(a==="center")Y=D-(i-Ce)/2;else {let Z=i*.1;if(D<c+Z)Y=D-Z;else if(Pe>c+i-Z)Y=Pe-i+Z;else return}let Tt=e.scrollWidth-i,Fe=Math.max(0,Math.min(Y,Tt));e.scrollTo({left:ur(e)?-Fe:Fe,behavior:"smooth"});}getVisibleButtonWidths(){let e=this.prevButton()?.nativeElement,a=this.nextButton()?.nativeElement;return [e,a].reduce((n,i)=>i?n+hn(i):n,0)}bindResizeObserver(){this.resizeObserver=new ResizeObserver(()=>this.updateButtonState()),this.resizeObserver.observe(this.el.nativeElement);}unbindResizeObserver(){this.resizeObserver&&(this.resizeObserver.unobserve(this.el.nativeElement),this.resizeObserver=null);}static \u0275fac=function(a){return new(a||t)};static \u0275cmp=AE({type:t,selectors:[["p-tablist"]],contentQueries:function(a,n,i){a&1&&bp(i,n.prevIconTemplate,xt,4)(i,n.nextIconTemplate,_t,4),a&2&&_I(2);},viewQuery:function(a,n){a&1&&Mp(n.content,ht,5)(n.prevButton,Ct,5)(n.nextButton,Pt,5)(n.inkbar,Ft,5),a&2&&_I(4);},hostVars:2,hostBindings:function(a,n){a&2&&UI(n.cx("root"));},features:[aD([ut,{provide:pt,useExisting:t},{provide:pe,useExisting:t}]),BE([N]),cp],ngContentSelectors:X,decls:7,vars:8,consts:[["content",""],["inkbar",""],["prevButton",""],["nextButton",""],["type","button","pRipple","",3,"pBind","class"],["role","tablist",3,"scroll","pBind"],["role","presentation",3,"pBind"],["type","button","pRipple","",3,"click","pBind"],["data-p-icon","chevron-left"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-right"]],template:function(a,n){a&1&&(TI(),aI(0,Nt,4,7,"button",4),ai(1,"div",5,0),Tp("scroll",function(c){return n.onScroll(c)}),wI(3),mp(4,"span",6,1),yc(),aI(6,At,4,7,"button",4)),a&2&&(cI(n.showNavigators()&&n.isPrevButtonEnabled()?0:-1),Ky(),UI(n.cx("content")),gp("pBind",n.ptm("content")),Ky(3),UI(n.cx("activeBar")),gp("pBind",n.ptm("activeBar")),Ky(2),cI(n.showNavigators()&&n.isNextButtonEnabled()?6:-1));},dependencies:[bn,P,B,Zd,qt$1,Ut$1,Ad,N],encapsulation:2})}return t})(),bt=new C$1("TAB_INSTANCE"),Te=(()=>{class t extends J{componentName="Tab";$pcTab=v(bt,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(N,{self:true});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}value=tL();disabled=eL(false,{transform:lL});pcTabs=v(no(()=>W));pcTabList=v(no(()=>de));el=v(lr);_componentStyle=v(ct);ripple=bD(()=>this.config.ripple());id=bD(()=>`${this.pcTabs.id()}_tab_${this.value()}`);ariaControls=bD(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);active=bD(()=>rt$1(this.pcTabs.value(),this.value()));tabindex=bD(()=>this.disabled()?-1:this.active()?this.pcTabs.tabindex():-1);mutationObserver;onFocus(e){this.disabled()||this.pcTabs.selectOnFocus()&&this.changeActiveValue();}onClick(e){this.disabled()||this.changeActiveValue();}onKeyDown(e){switch(e.code){case "ArrowRight":this.onArrowRightKey(e);break;case "ArrowLeft":this.onArrowLeftKey(e);break;case "Home":this.onHomeKey(e);break;case "End":this.onEndKey(e);break;case "PageDown":this.onPageDownKey(e);break;case "PageUp":this.onPageUpKey(e);break;case "Enter":case "NumpadEnter":case "Space":this.onEnterKey(e);break;}e.stopPropagation();}onAfterViewInit(){this.bindMutationObserver();}onArrowRightKey(e){let a=this.findNextTab(e.currentTarget);a?this.changeFocusedTab(a):this.onHomeKey(e),e.preventDefault();}onArrowLeftKey(e){let a=this.findPrevTab(e.currentTarget);a?this.changeFocusedTab(a):this.onEndKey(e),e.preventDefault();}onHomeKey(e){let a=this.findFirstTab();this.changeFocusedTab(a),e.preventDefault();}onEndKey(e){let a=this.findLastTab();this.changeFocusedTab(a),e.preventDefault();}onPageDownKey(e){this.scrollInView(this.findLastTab()),e.preventDefault();}onPageUpKey(e){this.scrollInView(this.findFirstTab()),e.preventDefault();}onEnterKey(e){this.disabled()||this.changeActiveValue(),e.preventDefault();}findNextTab(e,a=false){let n=a?e:e?.nextElementSibling;return n?Pa(n,"data-p-disabled")||Pa(n,"data-pc-section")==="activebar"?this.findNextTab(n):n:null}findPrevTab(e,a=false){let n=a?e:e?.previousElementSibling;return n?Pa(n,"data-p-disabled")||Pa(n,"data-pc-section")==="activebar"?this.findPrevTab(n):n:null}findFirstTab(){return this.findNextTab(this.pcTabList?.content()?.nativeElement?.firstElementChild,true)}findLastTab(){return this.findPrevTab(this.pcTabList?.content()?.nativeElement?.lastElementChild,true)}changeActiveValue(){this.pcTabs.updateValue(this.value());}changeFocusedTab(e){e&&Ma(e),this.scrollInView(e);}scrollInView(e){e?.scrollIntoView?.({block:"nearest"});}bindMutationObserver(){$t(this.platformId)&&(this.mutationObserver=new MutationObserver(e=>{e.forEach(()=>{this.active()&&this.pcTabList?.updateInkBar();});}),this.mutationObserver.observe(this.el.nativeElement,{childList:true,characterData:true,subtree:true}));}unbindMutationObserver(){this.mutationObserver?.disconnect();}onDestroy(){this.mutationObserver&&this.unbindMutationObserver();}static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275cmp=AE({type:t,selectors:[["p-tab"]],hostVars:10,hostBindings:function(a,n){a&1&&Tp("focus",function(c){return n.onFocus(c)})("click",function(c){return n.onClick(c)})("keydown",function(c){return n.onKeyDown(c)}),a&2&&(hp("id",n.id())("aria-controls",n.ariaControls())("role","tab")("aria-selected",n.active())("aria-disabled",n.disabled())("data-p-disabled",n.disabled())("data-p-active",n.active())("tabindex",n.tabindex()),UI(n.cx("root")));},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[aD([ct,{provide:bt,useExisting:t},{provide:pe,useExisting:t}]),BE([qt$1,N]),cp],ngContentSelectors:X,decls:1,vars:0,template:function(a,n){a&1&&(TI(),wI(0));},dependencies:[Ut$1,Ad],encapsulation:2})}return t})(),Ut={root:({instance:t})=>["p-tabpanel",{"p-tabpanel-active":t.active()}]},mt=(()=>{class t extends G{name="tabpanel";classes=Ut;static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275prov=oe({token:t,factory:t.\u0275fac})}return t})();var ft=new C$1("TABPANEL_INSTANCE"),xe=(()=>{class t extends J{componentName="TabPanel";$pcTabPanel=v(ft,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(N,{self:true});pcTabs=v(no(()=>W));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}lazy=eL(false,{transform:lL});value=tL(void 0);content=rL("content",{descendants:false});id=bD(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);ariaLabelledby=bD(()=>`${this.pcTabs.id()}_tab_${this.value()}`);active=bD(()=>rt$1(this.pcTabs.value(),this.value()));isLazyEnabled=bD(()=>this.pcTabs.lazy()||this.lazy());hasBeenRendered=false;shouldRender=bD(()=>!this.isLazyEnabled()||this.hasBeenRendered?true:this.active()?(this.hasBeenRendered=true,true):false);_componentStyle=v(mt);static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275cmp=AE({type:t,selectors:[["p-tabpanel"]],contentQueries:function(a,n,i){a&1&&bp(i,n.content,ht,4),a&2&&_I();},hostVars:7,hostBindings:function(a,n){a&2&&(Ip("hidden",!n.active()),hp("id",n.id())("role","tabpanel")("aria-labelledby",n.ariaLabelledby())("data-p-active",n.active()),UI(n.cx("root")));},inputs:{lazy:[1,"lazy"],value:[1,"value"]},outputs:{value:"valueChange"},features:[aD([mt,{provide:ft,useExisting:t},{provide:pe,useExisting:t}]),BE([N]),cp],ngContentSelectors:X,decls:3,vars:1,consts:[["defaultContent",""],[4,"ngTemplateOutlet"]],template:function(a,n){a&1&&(TI(),up(0,It,1,0,"ng-template",null,0,DD),aI(2,Vt,1,1,"ng-container")),a&2&&(Ky(2),cI(n.shouldRender()?2:-1));},dependencies:[bn,Ad],encapsulation:2})}return t})(),Wt={root:"p-tabpanels"},vt=(()=>{class t extends G{name="tabpanels";classes=Wt;static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275prov=oe({token:t,factory:t.\u0275fac})}return t})();var gt=new C$1("TABPANELS_INSTANCE"),_e=(()=>{class t extends J{componentName="TabPanels";$pcTabPanels=v(gt,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=v(N,{self:true});_componentStyle=v(vt);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}static \u0275fac=(()=>{let e;return function(n){return (e||(e=hm(t)))(n||t)}})();static \u0275cmp=AE({type:t,selectors:[["p-tabpanels"]],hostVars:3,hostBindings:function(a,n){a&2&&(hp("role","presentation"),UI(n.cx("root")));},features:[aD([vt,{provide:gt,useExisting:t},{provide:pe,useExisting:t}]),BE([N]),cp],ngContentSelectors:X,decls:1,vars:0,template:function(a,n){a&1&&(TI(),wI(0));},dependencies:[Ad],encapsulation:2})}return t})(),wt=(()=>{class t{static \u0275fac=function(a){return new(a||t)};static \u0275mod=kE({type:t});static \u0275inj=El({imports:[W,_e,xe,de,Te,Ad,Ad]})}return t})();function Ht(t,o){t&1&&(ai(0,"p",12),XI(1,"Profile updated."),yc());}function qt(t,o){t&1&&(ai(0,"p",21),XI(1,"Passwords do not match."),yc());}function Kt(t,o){t&1&&(ai(0,"p",22),XI(1,"Password changed."),yc());}var yt=class t{formCreator=v(le);accountFacade=v(se);profileForm;changePasswordForm;activeTab=bo("profile");mask=bo(true);profileSaved=bo(false);passwordChanged=bo(false);ngOnInit(){this.profileForm=this.formCreator.createProfileForm(),this.changePasswordForm=this.formCreator.createChangePasswordForm(),this.accountFacade.getProfile().then(o=>{this.profileForm.patchValue({name:o.name,mobile:o.profile.mobile});});}onSubmitProfile(){if(this.profileForm.invalid)return;let o=ot.toDomain(this.profileForm.getRawValue());this.accountFacade.updateProfile(o).then(()=>{this.profileSaved.set(true);});}onSubmitChangePassword(){if(this.changePasswordForm.invalid)return;let o=rt.toDomain(this.changePasswordForm.getRawValue());this.accountFacade.changePassword(o).then(()=>{this.passwordChanged.set(true),this.changePasswordForm.reset();});}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=AE({type:t,selectors:[["app-account"]],decls:43,vars:11,consts:[[1,"mx-auto","max-w-2xl","p-6","sm:p-10"],[1,"text-2xl","font-medium","text-surface-900","dark:text-surface-0"],[1,"mt-1","text-sm","text-surface-500","dark:text-surface-400"],[1,"mt-8","block",3,"valueChange","value"],["value","profile"],["value","password"],["data-testid","profile-form",1,"flex","flex-col","gap-4","pt-6",3,"ngSubmit","formGroup"],[1,"flex","flex-col","gap-1.5"],["for","name",1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300"],["id","name","pInputText","","formControlName","name","autocomplete","name","data-testid","profile-name-input",1,"w-full"],["for","mobile",1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300"],["id","mobile","pInputText","","formControlName","mobile","autocomplete","tel","data-testid","profile-mobile-input",1,"w-full"],["data-testid","profile-saved-message",1,"text-sm","text-green-600"],["pButton","","type","submit","data-testid","profile-submit-button",1,"mt-2","w-fit",3,"disabled"],["data-testid","change-password-form",1,"flex","flex-col","gap-4","pt-6",3,"ngSubmit","formGroup"],["for","currentPassword",1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300"],["pInputPassword","","inputId","currentPassword","id","currentPassword","formControlName","currentPassword","autocomplete","current-password","data-testid","change-password-current-input",1,"w-full",3,"maskChange","mask"],["for","newPassword",1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300"],["pInputPassword","","inputId","newPassword","id","newPassword","formControlName","newPassword","autocomplete","new-password","data-testid","change-password-new-input",1,"w-full",3,"maskChange","mask"],["for","confirmPassword",1,"text-sm","font-semibold","text-surface-700","dark:text-surface-300"],["pInputPassword","","inputId","confirmPassword","id","confirmPassword","formControlName","confirmPassword","autocomplete","new-password","data-testid","change-password-confirm-input",1,"w-full",3,"maskChange","mask"],[1,"text-sm","text-red-500"],["data-testid","password-changed-message",1,"text-sm","text-green-600"],["pButton","","type","submit","data-testid","change-password-submit-button",1,"mt-2","w-fit",3,"disabled"]],template:function(e,a){e&1&&(ai(0,"div",0)(1,"h1",1),XI(2,"Account settings"),yc(),ai(3,"p",2),XI(4,"Manage your profile and password."),yc(),ai(5,"p-tabs",3),qp$1("valueChange",function(i){return rD(a.activeTab,i)||(a.activeTab=i),i}),ai(6,"p-tablist")(7,"p-tab",4),XI(8,"Profile"),yc(),ai(9,"p-tab",5),XI(10,"Change password"),yc()(),ai(11,"p-tabpanels")(12,"p-tabpanel",4)(13,"form",6),Tp("ngSubmit",function(){return a.onSubmitProfile()}),ai(14,"div",7)(15,"label",8),XI(16,"Name"),yc(),mp(17,"input",9),Hv(),yc(),ai(18,"div",7)(19,"label",10),XI(20,"Mobile"),yc(),mp(21,"input",11),Hv(),yc(),aI(22,Ht,2,0,"p",12),ai(23,"button",13),XI(24,"Save changes"),yc()()(),ai(25,"p-tabpanel",5)(26,"form",14),Tp("ngSubmit",function(){return a.onSubmitChangePassword()}),ai(27,"div",7)(28,"label",15),XI(29,"Current password"),yc(),ai(30,"input",16),qp$1("maskChange",function(i){return rD(a.mask,i)||(a.mask=i),i}),yc(),Hv(),yc(),ai(31,"div",7)(32,"label",17),XI(33,"New password"),yc(),ai(34,"input",18),qp$1("maskChange",function(i){return rD(a.mask,i)||(a.mask=i),i}),yc(),Hv(),yc(),ai(35,"div",7)(36,"label",19),XI(37,"Confirm new password"),yc(),ai(38,"input",20),qp$1("maskChange",function(i){return rD(a.mask,i)||(a.mask=i),i}),yc(),Hv(),yc(),aI(39,qt,2,0,"p",21),aI(40,Kt,2,0,"p",22),ai(41,"button",23),XI(42,"Change password"),yc()()()()()()),e&2&&(Ky(5),Up("value",a.activeTab),Ky(8),gp("formGroup",a.profileForm),Ky(4),$v(),Ky(4),$v(),Ky(),cI(a.profileSaved()?22:-1),Ky(),gp("disabled",a.profileForm.invalid),Ky(3),gp("formGroup",a.changePasswordForm),Ky(4),Up("mask",a.mask),$v(),Ky(4),Up("mask",a.mask),$v(),Ky(4),Up("mask",a.mask),$v(),Ky(),cI(a.changePasswordForm.errors?.passwordMismatch&&a.changePasswordForm.get("confirmPassword")?.touched?39:-1),Ky(),cI(a.passwordChanged()?40:-1),Ky(),gp("disabled",a.changePasswordForm.invalid));},dependencies:[kn,Pn,et,In,Sn,cn,un,qp,Zp,oi,ri,C,S,wt,W,_e,xe,de,Te],encapsulation:2})};export{yt as Account};