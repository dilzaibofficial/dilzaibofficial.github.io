document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("sb3j2XrU9Pyfw2c2Q");

    // Get the contact form and success message elements
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    // Check if the contact form exists
    if (contactForm) {
        console.log('Contact form found');

        // Add an event listener for form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted');

            // Send the form data using EmailJS
            emailjs.sendForm('service_3upcig3', 'template_qo8nsqv', this)
                .then(function() {
                    console.log('Email sent successfully');
                    successMessage.classList.remove('hidden');
                    successMessage.textContent = 'Your message has been sent successfully!';
                }, function(error) {
                    console.error('Failed to send email:', error);
                    successMessage.classList.remove('hidden');
                    successMessage.textContent = 'Failed to send the message. Please try again later.';
                });
        });
    } else {
        console.error('Contact form not found');
    }

    // Light/Dark mode toggle
    const modeIcon = document.getElementById('mode-icon');
    modeIcon.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            modeIcon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            modeIcon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Canvas animation setup
    function n(e) {
        this.init(e || {});
    }
    n.prototype = {
        init: function (e) {
            this.phase = e.phase || 0;
            this.offset = e.offset || 0;
            this.frequency = e.frequency || 0.001;
            this.amplitude = e.amplitude || 1;
        },
        update: function () {
            return (
                (this.phase += this.frequency), (e = this.offset + Math.sin(this.phase) * this.amplitude)
            );
        },
        value: function () {
            return e;
        },
    };

    function Line(e) {
        this.init(e || {});
    }

    Line.prototype = {
        init: function (e) {
            this.spring = e.spring + 0.1 * Math.random() - 0.05;
            this.friction = E.friction + 0.01 * Math.random() - 0.005;
            this.nodes = [];
            for (var t, n = 0; n < E.size; n++) {
                t = new Node();
                t.x = pos.x;
                t.y = pos.y;
                this.nodes.push(t);
            }
        },
        update: function () {
            var e = this.spring,
                t = this.nodes[0];
            t.vx += (pos.x - t.x) * e;
            t.vy += (pos.y - t.y) * e;
            for (var n, i = 0, a = this.nodes.length; i < a; i++)
                (t = this.nodes[i]),
                    0 < i &&
                    ((n = this.nodes[i - 1]),
                        (t.vx += (n.x - t.x) * e),
                        (t.vy += (n.y - t.y) * e),
                        (t.vx += n.vx * E.dampening),
                        (t.vy += n.vy * E.dampening)),
                    (t.vx *= this.friction),
                    (t.vy *= this.friction),
                    (t.x += t.vx),
                    (t.y += t.vy),
                    (e *= E.tension);
        },
        draw: function () {
            var e,
                t,
                n = this.nodes[0].x,
                i = this.nodes[0].y;
            ctx.beginPath();
            ctx.moveTo(n, i);
            for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
                e = this.nodes[a];
                t = this.nodes[a + 1];
                n = 0.5 * (e.x + t.x);
                i = 0.5 * (e.y + t.y);
                ctx.quadraticCurveTo(e.x, e.y, n, i);
            }
            e = this.nodes[a];
            t = this.nodes[a + 1];
            ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
            ctx.stroke();
            ctx.closePath();
        },
    };

    function onMousemove(e) {
        function o() {
            lines = [];
            for (var e = 0; e < E.trails; e++)
                lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
        }
        function c(e) {
            e.touches
                ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
                : ((pos.x = e.clientX), (pos.y = e.clientY)),
                e.preventDefault();
        }
        function l(e) {
            1 == e.touches.length && ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
        }
        document.removeEventListener('mousemove', onMousemove),
            document.removeEventListener('touchstart', onMousemove),
            document.addEventListener('mousemove', c),
            document.addEventListener('touchmove', c),
            document.addEventListener('touchstart', l),
            c(e),
            o(),
            render();
    }

    function render() {
        if (ctx.running) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',90%,50%,0.25)';
            ctx.lineWidth = 1;
            for (var e, t = 0; t < E.trails; t++) {
                (e = lines[t]).update();
                e.draw();
            }
            ctx.frame++;
            window.requestAnimationFrame(render);
        }
    }

    function resizeCanvas() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    var ctx,
        f,
        e = 0,
        pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        lines = [],
        E = {
            debug: true,
            friction: 0.5,
            trails: 20,
            size: 50,
            dampening: 0.25,
            tension: 0.98,
        };
    function Node() {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
    }

    window.onload = function () {
        ctx = document.getElementById('canvas').getContext('2d');
        ctx.running = true;
        ctx.frame = 1;
        f = new n({
            phase: Math.random() * 2 * Math.PI,
            amplitude: 85,
            frequency: 0.0015,
            offset: 285,
        });
        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('touchstart', onMousemove);
        document.body.addEventListener('orientationchange', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('focus', () => {
            if (!ctx.running) {
                ctx.running = true;
                render();
            }
        });
        window.addEventListener('blur', () => {
            ctx.running = true;
        });
        resizeCanvas();
        render(); // Start the animation
    };
});