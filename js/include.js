// Función para incluir componentes HTML
function includeHTML() {
    const includeTargets = document.querySelectorAll('[data-include]');
    
    includeTargets.forEach(target => {
        const file = target.getAttribute('data-include');
        
        fetch(file)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Error al cargar el archivo: ' + response.status);
            })
            .then(data => {
                target.innerHTML = data;
                
                // Ejecutar scripts dentro del componente incluido
                const scripts = target.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.text = script.text;
                    document.body.appendChild(newScript).parentNode.removeChild(newScript);
                });
                
                // Disparar evento personalizado cuando se carga un componente
                document.dispatchEvent(new CustomEvent('componentLoaded', {
                    detail: { component: file }
                }));
            })
            .catch(error => {
                console.error(error);
                target.innerHTML = '<p>Error al cargar el componente: ' + file + '</p>';
            });
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includeHTML);
} else {
    includeHTML();
}