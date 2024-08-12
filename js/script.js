document.addEventListener('DOMContentLoaded', function(){
    // modal 
    document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-show-modal]')) return;
        else{
        e.preventDefault();
        var modal = document.querySelectorAll('#'+e.target.dataset.id);
        Array.prototype.forEach.call(modal, function (el) {
                el.classList.add('active');
        });
        }
    });
    document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-close-modal]')) return;
        else{
            e.target.closest('.modal').classList.remove('active');
        }
    });
    // observer, анимация на скролле 
    const inViewport = (element, observer) => {
        element.forEach(entry => {
            entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
            element.forEach(item => {
            if(item.target.classList.contains('is-inViewport') && !item.target.classList.contains('watched')){
                item.target.classList.add("watched");
            }
            })
        });
    };
    let ioConfiguration = {
    rootMargin: '0% 0% 0% 0%',
    threshold: 0.2
    };
    const Obs = new IntersectionObserver(inViewport, ioConfiguration);
    const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
    ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
    });
    document.querySelectorAll(".tab--box").forEach(c=>{
        const cardClassName = "tab--box";
        const tabDataAttributeName = "data-tab-id";
    
        const tabClassName = `${cardClassName}__tab`;
        const tabSectionClassName = `${cardClassName}__section`;
        const tabSectionsContainerClassName = `${cardClassName}__body`;
    
        const tabSectionsContainerSelector = `.${tabSectionsContainerClassName}`;
    
        const tabSelector = `.${tabClassName}[${tabDataAttributeName}]`;
        const tabSectionSelector = `.${tabSectionClassName}`;
    
        const activeTabClassName = `${tabClassName}--active`;
        const activeSectionClassName = `${tabSectionClassName}--active`;
    
        const tabs = c.querySelectorAll(tabSelector);
        const tabsSections = c.querySelector(tabSectionSelector);
        const tabSectionsContainer = c.querySelector(
        tabSectionsContainerSelector
        );
    
        const setTabInactive = (tab) => tab && tab.classList.remove(activeTabClassName);
        const setTabActive = (tab) => tab && tab.classList.add(activeTabClassName);
    
        const setSectionInactive = (section) =>
        section && section.classList.remove(activeSectionClassName);
        const setSectionActive = (sectionId) => {
        const currentSection = c.querySelector(
            `${tabSectionSelector}#${sectionId}`
        );
    
        if (currentSection) {
            changeSectionsContainerHeight(currentSection);
            currentSection.classList.add(activeSectionClassName);
        }
        };
    
        const getCurrentlyActiveTab = () =>
        c.querySelector(`.${activeTabClassName}`);
        const getCurrentlyActiveSection = () =>
        c.querySelector(`.${activeSectionClassName}`);
    
        const getSectionHeight = (section) =>
        section && section.getBoundingClientRect().height;
        const changeSectionsContainerHeight = (section) =>
        (tabSectionsContainer.style.height = `${getSectionHeight(section)}px`);
    
        const changeTab = (tab) => {
        const tabSectionId = tab.getAttribute(tabDataAttributeName);
    
        if (tabSectionId) {
            setTabInactive(getCurrentlyActiveTab());
            setSectionInactive(getCurrentlyActiveSection());
            setTabActive(tab);
            setSectionActive(tabSectionId);
        }
        };
    
        const updateSectionsContainerHeight = () => {
        const currentlyActiveSection = getCurrentlyActiveSection();
        currentlyActiveSection &&
            changeSectionsContainerHeight(currentlyActiveSection);
        };
    
        (() => {
        changeTab(getCurrentlyActiveTab());
    
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => changeTab(tab));
        });
    
        window.addEventListener("load", () => updateSectionsContainerHeight());
        window.addEventListener("resize", () => updateSectionsContainerHeight());
        })();
    })

})
