function getBookmarks() {
// Función para recorrer los nodos de los marcadores
    function processBookmarkNode(bookmarkNode) {
        // Verifica si el nodo es un marcador
        if (bookmarkNode.url) {
            // Crea un enlace para el marcador
            var link = document.createElement("a");
            link.href = bookmarkNode.url;
            if (bookmarkNode.title) {
                link.innerText = '- ' + bookmarkNode.title;
            } else {
                link.innerText = '- ' + bookmarkNode.url;
            }
            link.className = "bookmark"
            link.target = "_blank"
            // Agrega el enlace al cuerpo de la ventana emergente
            document.body.appendChild(link);
        }
        // Verifica si el nodo tiene hijos
        if (bookmarkNode.children) {
            // Recorre los hijos del nodo
            for (var i = 0; i < bookmarkNode.children.length; i++) {
                processBookmarkNode(bookmarkNode.children[i]);
            }
        }
    }

// Obtiene los marcadores del usuario
    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        // Recorre los nodos de los marcadores
        for (var i = 0; i < bookmarkTreeNodes.length; i++) {
            processBookmarkNode(bookmarkTreeNodes[i]);
        }
    });

}

getBookmarks()
