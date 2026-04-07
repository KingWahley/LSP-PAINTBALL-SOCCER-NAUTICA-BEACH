(function () {
    var mobileButton = document.getElementById('mobile-menu-button');

    if (!mobileButton) {
        return;
    }

    var navItems = [
        { href: 'index.html', label: 'Home', subheading: 'Back to the main arena' },
        { href: 'about.html', label: 'About', subheading: 'The LSP story and packages' },
        { href: 'rules-and-safety.html', label: 'Rules', subheading: 'Arena rules and safety guide' },
        { href: 'gallery.html', label: 'Gallery', subheading: 'Moments from the field and beach' },
        { href: 'frequently-asked-questions.html', label: 'FAQs', subheading: 'Quick answers before you book' },
        { href: 'testimonials.html', label: 'Testimonials', subheading: 'What guests around Lagos are saying' },
        { href: 'contact.html', label: 'Contact', subheading: 'Reach us and book your session' }
    ];

    var footerLinks = [
        {
            href: 'https://instagram.com/nauticabeachpaintball',
            label: 'Instagram',
            icon: 'lucide:instagram'
        },
        {
            href: 'https://tiktok.com/@nauticabeachpaintball',
            label: 'TikTok',
            icon: 'simple-icons:tiktok'
        },
        {
            href: 'https://wa.me/2349048888466',
            label: 'WhatsApp',
            icon: 'mdi:whatsapp'
        }
    ];

    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var menu = document.createElement('div');
    menu.className = 'mobile-curved-nav';
    menu.setAttribute('aria-hidden', 'true');
    menu.innerHTML =
        '<div class="mobile-curved-nav__backdrop" data-mobile-nav-close></div>' +
        '<aside class="mobile-curved-nav__panel" aria-label="Mobile navigation">' +
        '  <div class="mobile-curved-nav__curve" aria-hidden="true"></div>' +
        '  <div class="mobile-curved-nav__inner">' +
        '    <div class="mobile-curved-nav__header">' +
        '      <div class="mobile-curved-nav__header-top">' +
        '        <p class="mobile-curved-nav__eyebrow">Navigation</p>' +
        '        <button class="mobile-curved-nav__close" type="button" aria-label="Close navigation menu" data-mobile-nav-close>' +
        '          <iconify-icon icon="lucide:x"></iconify-icon>' +
        '        </button>' +
        '      </div>' +
        '      <a href="booking.html" class="mobile-curved-nav__book">Book Session</a>' +
        '    </div>' +
        '    <nav class="mobile-curved-nav__links"></nav>' +
        '    <div class="mobile-curved-nav__footer"></div>' +
        '  </div>' +
        '</aside>';

    document.body.appendChild(menu);

    var linksWrap = menu.querySelector('.mobile-curved-nav__links');
    var footerWrap = menu.querySelector('.mobile-curved-nav__footer');
    var menuPanel = menu.querySelector('.mobile-curved-nav__panel');
    var focusableSelector = 'a, button, [tabindex]:not([tabindex="-1"])';

    navItems.forEach(function (item, index) {
        var link = document.createElement('a');
        var isActive = currentPage === item.href;
        link.href = item.href;
        link.className = 'mobile-curved-nav__link' + (isActive ? ' is-active' : '');
        link.innerHTML =
            '<span class="mobile-curved-nav__index">0' + (index + 1) + '</span>' +
            '<span class="mobile-curved-nav__text-wrap">' +
            '  <span class="mobile-curved-nav__label">' + item.label + '</span>' +
            '  <span class="mobile-curved-nav__subheading">' + item.subheading + '</span>' +
            '</span>';
        linksWrap.appendChild(link);
    });

    footerLinks.forEach(function (item) {
        var link = document.createElement('a');
        link.href = item.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'mobile-curved-nav__social';
        link.setAttribute('aria-label', item.label);
        link.innerHTML = '<iconify-icon icon="' + item.icon + '"></iconify-icon>';
        footerWrap.appendChild(link);
    });

    var isOpen = false;
    var previousOverflow = '';

    function setButtonIcon(open) {
        var icon = mobileButton.querySelector('iconify-icon');
        if (icon) {
            icon.setAttribute('icon', open ? 'lucide:x' : 'lucide:menu');
        }
        mobileButton.setAttribute('aria-expanded', String(open));
        mobileButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        mobileButton.classList.toggle('is-active', open);
    }

    function closeMenu() {
        if (!isOpen) {
            return;
        }

        isOpen = false;
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-nav-open');
        document.body.style.overflow = previousOverflow;
        setButtonIcon(false);
    }

    function openMenu() {
        if (isOpen) {
            return;
        }

        isOpen = true;
        previousOverflow = document.body.style.overflow;
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('mobile-nav-open');
        document.body.style.overflow = 'hidden';
        setButtonIcon(true);

        window.requestAnimationFrame(function () {
            var firstLink = menuPanel.querySelector(focusableSelector);
            if (firstLink) {
                firstLink.focus();
            }
        });
    }

    mobileButton.addEventListener('click', function () {
        if (isOpen) {
            closeMenu();
            return;
        }

        openMenu();
    });

    menu.addEventListener('click', function (event) {
        var target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        if (target.closest('[data-mobile-nav-close]') || target.closest('.mobile-curved-nav__link')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) {
            closeMenu();
        }
    });

    setButtonIcon(false);
}());

