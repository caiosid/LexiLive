# LexiLive: Aprenda vocabulário com a vida Real!

## 📝 Descrição do Projeto

O LexiLive é um aplicativo inovador projetado para transformar a maneira como você aprende um novo idioma. Ele utiliza a câmera do seu celular para capturar cenas do cotidiano e, através dessa imersão visual, ensina vocabulário de forma prática e interativa. Nossa missão é conectar o aprendizado com a vida real, tornando-o mais intuitivo e eficaz.

---

## ✨ Funcionalidades Principais

* **Tela Inicial:** Uma apresentação envolvente que introduz os conceitos e benefícios do aplicativo.
* **Login de Usuário:** Sistema de autenticação seguro para que você possa acompanhar seu progresso.
* **Recuperação de Senha:** Funcionalidade para garantir acesso contínuo à sua conta.
* **Seleção de Idioma:** Escolha facilmente o idioma que deseja aprender e mergulhe em novas culturas.

---

## 🚀 Tecnologias Utilizadas

* **React Native:** Para o desenvolvimento do aplicativo móvel, garantindo compatibilidade com iOS e Android.
* **React Navigation:** Gerenciamento eficiente da navegação entre as telas.
* **JSX:** Sintaxe para estruturar a interface do usuário.
* **CSS:** Estilização dos componentes para uma experiência visual agradável.

---

## 🛠️ Instalação e Uso

Siga os passos abaixo para rodar o projeto localmente em sua máquina:

1.  **Clone o repositório:**
    `git clone https://github.com/seu-usuario/LexiLive.git`
2.  **Acesse o diretório do projeto:**
    `cd LexiLive`
3.  **Instale as dependências:**
    `npm install` ou `yarn`
4.  **Inicie o aplicativo:**
    `npx expo start`

O Expo irá gerar um QR code no seu terminal. Basta escaneá-lo com o aplicativo **Expo Go** no seu celular para visualizar o projeto.


---
## 📈 Treino de modelo de IA

* Utilizado classes do COCO

`utilizado comando abaixo`

yolo detect train data=coco.yaml model=yolo11n.pt epochs=10 imgsz=416 batch=2 device=0

#### Resultado

| Class | GT | Pred | Precision | Recall | mAP50 | mAP50-95 |
|-------|----|------|-----------|--------|-------|----------|
| all | 5000 | 36335 | 0.553 | 0.394 | 0.41 | 0.279 |
| person | 2693 | 10777 | 0.761 | 0.564 | 0.663 | 0.434 |
| bicycle | 149 | 314 | 0.443 | 0.299 | 0.307 | 0.167 |
| car | 535 | 1918 | 0.685 | 0.378 | 0.453 | 0.277 |
| motorcycle | 159 | 367 | 0.689 | 0.447 | 0.542 | 0.32 |
| airplane | 97 | 143 | 0.676 | 0.685 | 0.742 | 0.565 |
| bus | 189 | 283 | 0.748 | 0.569 | 0.641 | 0.529 |
| train | 157 | 190 | 0.756 | 0.716 | 0.761 | 0.573 |
| truck | 250 | 414 | 0.595 | 0.292 | 0.365 | 0.232 |
| boat | 121 | 424 | 0.515 | 0.233 | 0.278 | 0.141 |
| traffic light | 191 | 634 | 0.565 | 0.258 | 0.277 | 0.142 |
| fire hydrant | 86 | 101 | 0.789 | 0.673 | 0.707 | 0.56 |
| stop sign | 69 | 75 | 0.501 | 0.6 | 0.589 | 0.542 |
| parking meter | 37 | 60 | 0.591 | 0.467 | 0.486 | 0.337 |
| bench | 235 | 411 | 0.459 | 0.234 | 0.24 | 0.156 |
| bird | 125 | 427 | 0.681 | 0.265 | 0.328 | 0.198 |
| cat | 184 | 202 | 0.708 | 0.718 | 0.749 | 0.567 |
| dog | 177 | 218 | 0.712 | 0.537 | 0.613 | 0.47 |
| horse | 128 | 272 | 0.606 | 0.614 | 0.628 | 0.428 |
| sheep | 65 | 354 | 0.628 | 0.486 | 0.525 | 0.342 |
| cow | 87 | 372 | 0.644 | 0.516 | 0.581 | 0.393 |
| elephant | 89 | 252 | 0.678 | 0.734 | 0.738 | 0.517 |
| bear | 49 | 71 | 0.577 | 0.803 | 0.727 | 0.595 |
| zebra | 85 | 266 | 0.701 | 0.748 | 0.802 | 0.565 |
| giraffe | 101 | 232 | 0.746 | 0.802 | 0.813 | 0.599 |
| backpack | 228 | 371 | 0.486 | 0.0701 | 0.0957 | 0.0492 |
| umbrella | 174 | 407 | 0.619 | 0.403 | 0.434 | 0.27 |
| handbag | 292 | 540 | 0.435 | 0.0593 | 0.0869 | 0.0447 |
| tie | 145 | 252 | 0.6 | 0.262 | 0.311 | 0.2 |
| suitcase | 105 | 299 | 0.46 | 0.325 | 0.304 | 0.198 |
| frisbee | 84 | 115 | 0.566 | 0.589 | 0.584 | 0.447 |
| skis | 120 | 241 | 0.379 | 0.241 | 0.19 | 0.0764 |
| snowboard | 49 | 69 | 0.415 | 0.246 | 0.262 | 0.155 |
| sports ball | 169 | 260 | 0.724 | 0.354 | 0.395 | 0.28 |
| kite | 91 | 327 | 0.557 | 0.462 | 0.458 | 0.284 |
| baseball bat | 97 | 145 | 0.354 | 0.276 | 0.238 | 0.12 |
| baseball glove | 100 | 148 | 0.441 | 0.365 | 0.36 | 0.192 |
| skateboard | 127 | 179 | 0.623 | 0.57 | 0.556 | 0.36 |
| surfboard | 149 | 267 | 0.546 | 0.356 | 0.385 | 0.219 |
| tennis racket | 167 | 225 | 0.591 | 0.533 | 0.536 | 0.299 |
| bottle | 379 | 1013 | 0.605 | 0.263 | 0.339 | 0.21 |
| wine glass | 110 | 341 | 0.505 | 0.232 | 0.233 | 0.149 |
| cup | 390 | 895 | 0.546 | 0.326 | 0.354 | 0.247 |
| fork | 155 | 215 | 0.514 | 0.261 | 0.274 | 0.175 |
| knife | 181 | 325 | 0.266 | 0.0769 | 0.0902 | 0.049 |
| spoon | 153 | 253 | 0.38 | 0.0484 | 0.0785 | 0.0446 |
| bowl | 314 | 623 | 0.592 | 0.344 | 0.415 | 0.301 |
| banana | 103 | 370 | 0.436 | 0.211 | 0.258 | 0.149 |
| apple | 76 | 236 | 0.366 | 0.178 | 0.155 | 0.101 |
| sandwich | 98 | 177 | 0.473 | 0.39 | 0.365 | 0.245 |
| orange | 85 | 285 | 0.333 | 0.309 | 0.232 | 0.168 |
| broccoli | 71 | 312 | 0.49 | 0.234 | 0.299 | 0.157 |
| carrot | 81 | 365 | 0.43 | 0.134 | 0.19 | 0.109 |
| hot dog | 51 | 125 | 0.35 | 0.384 | 0.301 | 0.204 |
| pizza | 153 | 284 | 0.666 | 0.556 | 0.597 | 0.445 |
| donut | 62 | 328 | 0.443 | 0.424 | 0.398 | 0.301 |
| cake | 124 | 310 | 0.586 | 0.265 | 0.352 | 0.233 |
| chair | 580 | 1771 | 0.552 | 0.228 | 0.288 | 0.171 |
| couch | 195 | 261 | 0.5 | 0.483 | 0.478 | 0.325 |
| potted plant | 172 | 342 | 0.614 | 0.224 | 0.289 | 0.147 |
| bed | 149 | 163 | 0.593 | 0.491 | 0.547 | 0.384 |
| dining table | 501 | 695 | 0.474 | 0.391 | 0.36 | 0.253 |
| toilet | 149 | 179 | 0.568 | 0.698 | 0.696 | 0.543 |
| tv | 207 | 288 | 0.605 | 0.559 | 0.587 | 0.437 |
| laptop | 183 | 231 | 0.587 | 0.597 | 0.585 | 0.449 |
| mouse | 88 | 106 | 0.389 | 0.632 | 0.519 | 0.385 |
| remote | 145 | 283 | 0.405 | 0.159 | 0.172 | 0.0939 |
| keyboard | 106 | 153 | 0.47 | 0.516 | 0.469 | 0.31 |
| cell phone | 214 | 262 | 0.576 | 0.256 | 0.293 | 0.204 |
| microwave | 54 | 55 | 0.326 | 0.691 | 0.413 | 0.272 |
| oven | 115 | 143 | 0.452 | 0.399 | 0.417 | 0.252 |
| toaster | 8 | 9 | 1 | 0 | 0.171 | 0.1 |
| sink | 187 | 225 | 0.528 | 0.44 | 0.426 | 0.26 |
| refrigerator | 101 | 126 | 0.529 | 0.587 | 0.589 | 0.431 |
| book | 230 | 1129 | 0.349 | 0.0177 | 0.119 | 0.052 |
| clock | 204 | 267 | 0.649 | 0.562 | 0.554 | 0.363 |
| vase | 137 | 274 | 0.466 | 0.299 | 0.318 | 0.204 |
| scissors | 28 | 36 | 0.32 | 0.222 | 0.188 | 0.122 |
| teddy bear | 94 | 190 | 0.606 | 0.516 | 0.5 | 0.336 |
| hair drier | 9 | 11 | 1 | 0 | 0.00376 | 0.00225 |
| toothbrush | 34 | 57 | 0.422 | 0.158 | 0.141 | 0.0925 |

---
## 👨‍💻 Implementação de pyopencl para transferência de imagem - passo a passo

    # --- inicializar pyopencl - detecta a primeira CPU identificada e cria contexto - se não roda error ---
    def get_opencl_context():
        for platform in cl.get_platforms():
            if "NVIDIA" in platform.name or "Intel" in platform.name:
                devices = platform.get_devices(device_type=cl.device_type.GPU)
                if devices:
                    print(f"Using OpenCL on: {platform.name} - {devices[0].name}")
                    return cl.Context(devices=devices)
        raise RuntimeError("No OpenCL GPU device found.")
    
    ctx = get_opencl_context()
    # Cria fila de comandos para o contexto kernels e operações na GPU
    queue = cl.CommandQueue(ctx)
    
    """
     kernel para copiar imagem
     __global -> variável global
     const -> Kernel não modifica a origem
     uchar -> caractere sem sinal em C/OpenCL equivalente a um inteiro de 8 bits sem sinal
     dst -> destino da foto
     get_global_id(0) -> pega o ID do trabalho em andamento
    """
    COPY_KERNEL = """
    __kernel void copy_image(__global const uchar *src, __global uchar *dst) {
        int i = get_global_id(0);
        dst[i] = src[i];
    }
    """
    
        # Compila o código para GPU
    program = cl.Program(ctx, COPY_KERNEL).build()
    
    def copy_with_opencl(image: np.ndarray) -> np.ndarray:
        """Copia imagem com GPU."""
        # diminui dimensão com o flatten
        img_flat = image.flatten()
        output = np.empty_like(img_flat)
        mf = cl.mem_flags
        # coloca flag de somente ler - aloca buffer da GPU
        src_buf = cl.Buffer(ctx, mf.READ_ONLY | mf.COPY_HOST_PTR, hostbuf=img_flat)
        # aloca memória vazia para ser escrita
        dst_buf = cl.Buffer(ctx, mf.WRITE_ONLY, output.nbytes)
    
    
        # prepara a instrução de copiar imagem
        program.copy_image(queue, img_flat.shape, None, src_buf, dst_buf)
        """ Roda N threads de GPU:
            thread 0 → copia src[0]
            thread 1 → copia src[1]
            ...
            thread N-1 → copia src[N-1]"""
        cl.enqueue_copy(queue, output, dst_buf)
        # retorna imagem 2D
        return output.reshape(image.shape)
---
## 👨‍💻 Colaboradores

*   **Caio Cesar, João Ricardo, Tiago Tenório, Thiago Yuji, Paulo Jose**
