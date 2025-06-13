 // Variables globales
        const totalPhotos = 13;
        const backgroundMusic = document.getElementById('backgroundMusic');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const songInfo = document.getElementById('songInfo');

        // Función para iniciar la historia
        function startStory() {
            document.getElementById('heroSection').style.display = 'none';
            document.getElementById('timelineContainer').style.display = 'block';
            
            // Scroll suave hacia el timeline
            setTimeout(() => {
                document.getElementById('timelineContainer').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 100);
            
            // Iniciar animaciones
            startFloatingElements();
            observePhotos();
        }

        // Crear elementos flotantes
        function startFloatingElements() {
            const container = document.getElementById('floatingElements');
            const icons = ['fas fa-heart', 'fas fa-star', 'far fa-circle'];
            
            // Limpiar elementos existentes
            container.innerHTML = '';
            
            for (let i = 0; i < 30; i++) {
                const element = document.createElement('i');
                element.className = 'floating-element ' + icons[Math.floor(Math.random() * icons.length)];
                
                if (element.classList.contains('fa-heart')) {
                    element.classList.add('heart');
                } else if (element.classList.contains('fa-star')) {
                    element.classList.add('star');
                }
                
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.animationDuration = (Math.random() * 10 + 15) + 's';
                element.style.animationDelay = Math.random() * 5 + 's';
                element.style.fontSize = (Math.random() * 20 + 10) + 'px';
                element.style.opacity = Math.random() * 0.1 + 0.05;
                
                container.appendChild(element);
            }
        }

        // Observador de intersección para animaciones
        function observePhotos() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                            updateProgressBar(entry.target);
                        }, 100);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            document.querySelectorAll('.photo-item').forEach(item => {
                observer.observe(item);
            });
        }

        // Actualizar barra de progreso
        function updateProgressBar(element) {
            const storyNumber = parseInt(element.dataset.story);
            const progress = (storyNumber / totalPhotos) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        // Abrir modal de imagen
        function openModal(wrapper) {
            const img = wrapper.querySelector('img');
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            
            if (img && img.src) {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.style.display = 'flex';
                
                // Animación de entrada
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        }

        // Cerrar modal
        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.classList.remove('active');
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 400);
        }

        // Control de música
        function togglePlayPause() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                songInfo.textContent = 'Reproduciendo...';
            } else {
                backgroundMusic.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                songInfo.textContent = 'Pausado';
            }
        }

        // Actualizar volumen
        function updateVolume() {
            backgroundMusic.volume = volumeSlider.value;
        }

        // Inicializar controles de música
        function initMusicControls() {
            // Configurar volumen inicial
            backgroundMusic.volume = volumeSlider.value;
            
            // Eventos de los controles
            playPauseBtn.addEventListener('click', togglePlayPause);
            volumeSlider.addEventListener('input', updateVolume);
            
            // Actualizar estado cuando la música termina
            backgroundMusic.addEventListener('ended', () => {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                songInfo.textContent = 'Finalizado';
            });
            
            // Actualizar estado cuando la música se pausa
            backgroundMusic.addEventListener('pause', () => {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                songInfo.textContent = 'Pausado';
            });
            
            // Actualizar estado cuando la música se reproduce
            backgroundMusic.addEventListener('play', () => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                songInfo.textContent = 'Reproduciendo...';
            });
        }

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Cerrar modal al hacer clic fuera de la imagen
        document.getElementById('imageModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('imageModal') || 
                e.target.classList.contains('close-modal')) {
                closeModal();
            }
        });

        // Iniciar animaciones básicas al cargar
        window.addEventListener('load', () => {
            startFloatingElements();
            initMusicControls();
        });