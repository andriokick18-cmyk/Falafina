# Gerador de pixel art do FalaFina — PNG puro (stdlib), sem dependências
import zlib, struct, os, math

def salvar_png(caminho, w, h, px):
    def chunk(t, d):
        c = t + d
        return struct.pack('>I', len(d)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)
    raw = b''.join(b'\x00' + b''.join(bytes(p) for p in linha) for linha in px)
    dados = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
             + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b''))
    open(caminho, 'wb').write(dados)

def C(hexs, a=255):
    hexs = hexs.lstrip('#')
    return (int(hexs[0:2],16), int(hexs[2:4],16), int(hexs[4:6],16), a)

T = (0,0,0,0)

class Tela:
    def __init__(s, w, h):
        s.w, s.h = w, h
        s.px = [[T]*w for _ in range(h)]
    def p(s, x, y, c):
        if 0 <= x < s.w and 0 <= y < s.h: s.px[y][x] = c
    def rect(s, x0, y0, x1, y1, c):
        for y in range(y0, y1+1):
            for x in range(x0, x1+1): s.p(x, y, c)
    def contorno(s, x0, y0, x1, y1, c):
        for x in range(x0, x1+1): s.p(x, y0, c); s.p(x, y1, c)
        for y in range(y0, y1+1): s.p(x0, y, c); s.p(x1, y, c)
    def hline(s, x0, x1, y, c):
        for x in range(x0, x1+1): s.p(x, y, c)
    def vline(s, x, y0, y1, c):
        for y in range(y0, y1+1): s.p(x, y, c)
    def auto_contorno(s, cor):
        # contorna qualquer pixel pintado que faz fronteira com transparente
        marcas = []
        for y in range(s.h):
            for x in range(s.w):
                if s.px[y][x] == T: continue
                for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx,ny = x+dx,y+dy
                    if 0 <= nx < s.w and 0 <= ny < s.h and s.px[ny][nx] == T:
                        marcas.append((x,y))
                        break
        for x,y in marcas: s.p(x,y,cor)

K  = C('#2A1A0A')
W  = C('#8B5A2B'); WL = C('#A9743C'); WD = C('#5C3A1A')
G  = C('#FFD700'); GL = C('#FFF3B0'); GD = C('#B8860B')
VERDE = C('#00885F'); VERDE_L = C('#7BC950'); VERDE_D = C('#0B5D3B')
VERM = C('#C0392B'); VERM_D = C('#7A1215'); VERM_L = C('#E8685A')
PAP = C('#F3E6C8'); PAP_D = C('#D8C9A5'); PAP_L = C('#FBF3E1')
ACO = C('#9AA1AC'); ACO_L = C('#D5DBE1'); ACO_D = C('#4B4F57')
AZUL = C('#2D5DA8'); VIDRO = C('#E8E4D8',150)

FEITOS = {}
def gravar(nome, t):
    FEITOS[nome] = t
    salvar_png('saida/%s.png' % nome, t.w, t.h, t.px)

os.makedirs('saida', exist_ok=True)

# BAÚ
t = Tela(16,16)
t.rect(2,4,13,12,W)
t.rect(2,4,13,5,WL)
t.hline(2,13,7,G); t.hline(2,13,8,GD)
t.vline(3,4,12,WD); t.vline(12,4,12,WD)
t.rect(6,6,9,10,GD); t.rect(7,7,8,9,G)
t.p(7,8,K); t.p(8,8,K)
t.hline(2,13,12,WD)
t.auto_contorno(K)
gravar('bau', t)

# ESCUDO
t = Tela(16,16)
for y in range(2,14):
    meia = 5 if y < 9 else 5 - (y-8)
    if meia < 0: break
    t.hline(7-meia, 8+meia, y, VERDE)
t.hline(3,12,3,G); t.hline(3,12,4,GD)
t.vline(4,5,9,VERDE_L)
t.p(7,8,GL); t.p(8,8,GL); t.p(7,9,G); t.p(8,9,G)
t.auto_contorno(K)
gravar('escudo', t)

# ESPADA (diagonal ↗)
t = Tela(16,16)
for i in range(9):
    x = 12 - i; y = 2 + i
    t.p(x, y, ACO_L); t.p(x-1, y+1, ACO)
t.p(13,1,ACO_L)
t.p(4,9,G); t.p(5,10,G); t.p(6,9,GD); t.p(5,8,GD); t.p(3,10,G)   # guarda
t.p(3,12,WD); t.p(2,13,WD)                                        # cabo
t.p(1,14,GD); t.p(2,14,G)                                         # pomo
t.auto_contorno(K)
gravar('espada', t)

# PERGAMINHO
t = Tela(16,16)
t.rect(3,3,12,13,PAP)
t.rect(3,3,12,3,PAP_L); t.rect(3,13,12,13,PAP_D)
t.rect(1,1,3,4,PAP_D)
t.rect(12,12,14,15,PAP_D)
for y in (6,8,10): t.hline(5,10,y,PAP_D)
t.auto_contorno(K)
gravar('pergaminho', t)

# SELO DE CERA
t = Tela(16,16)
for y in range(16):
    for x in range(16):
        d = math.hypot(x-7.5, y-7.5)
        if d < 6.0: t.p(x,y,VERM)
        elif d < 7.1: t.p(x,y,VERM_D)
for y in range(16):
    for x in range(16):
        d = math.hypot(x-7.5, y-7.5)
        if 3.2 < d < 4.4: t.p(x,y,VERM_D)
t.p(5,4,VERM_L); t.p(4,5,VERM_L)
t.auto_contorno(K)
gravar('selo', t)

# COROA
t = Tela(16,16)
t.rect(3,9,12,12,G)
t.hline(3,12,9,GL); t.hline(3,12,12,GD)
for x0 in (4,8,11):
    t.vline(x0,5,8,G); t.p(x0,5,GL)
t.p(5,10,VERM); t.p(8,10,VERDE); t.p(10,10,AZUL)
t.auto_contorno(K)
gravar('coroa', t)

# POÇÃO
t = Tela(16,16)
for y in range(8,14):
    meia = 3 if y > 9 else 1
    t.hline(7-meia, 8+meia, y, VERM if y > 9 else VIDRO)
t.rect(6,4,9,7,VIDRO)
t.rect(6,2,9,3,WD)
t.p(5,11,VERM_L)
t.auto_contorno(K)
gravar('pocao', t)

# GEMA
t = Tela(16,16)
for y in range(4,13):
    if y <= 7: meia = (y-3)*2
    else: meia = max(0, 12-y)*1 + (12-y)
    meia = min(meia, 5)
    t.hline(7-meia, 8+meia, y, VERDE)
t.p(6,5,VERDE_L); t.p(5,6,VERDE_L); t.p(7,4,VERDE_L)
t.p(9,10,VERDE_D); t.p(8,11,VERDE_D)
t.auto_contorno(K)
gravar('gema', t)

# MOLDURA 9-SLICE 24x24
t = Tela(24,24)
t.contorno(0,0,23,23,K)
t.contorno(1,1,22,22,WD); t.contorno(2,2,21,21,W); t.contorno(3,3,20,20,WL)
t.contorno(4,4,19,19,WD); t.contorno(5,5,18,18,K)
for cx,cy in ((0,0),(18,0),(0,18),(18,18)):
    t.rect(cx+1,cy+1,cx+4,cy+4,G)
    t.contorno(cx,cy,cx+5,cy+5,K)
    t.p(cx+1,cy+1,GL); t.p(cx+4,cy+4,GD)
gravar('moldura', t)

# BOTÃO 9-SLICE 24x12
t = Tela(24,12)
t.rect(1,1,22,10,W)
t.hline(1,22,1,WL); t.hline(1,22,2,WL)
t.hline(1,22,9,WD); t.hline(1,22,10,WD)
t.contorno(0,0,23,11,K)
t.p(1,1,G); t.p(22,1,G); t.p(1,10,GD); t.p(22,10,GD)
gravar('botao', t)

# CONTACT SHEET x8 em fundo escuro
ESC = 8; PAD = 12
nomes = list(FEITOS.keys())
larguras = [FEITOS[n].w*ESC for n in nomes]
altura_max = max(FEITOS[n].h for n in nomes)*ESC
W_TOTAL = sum(larguras) + PAD*(len(nomes)+1)
H_TOTAL = altura_max + PAD*2
fundo = C('#1C242D')
folha = [[fundo]*W_TOTAL for _ in range(H_TOTAL)]
x_off = PAD
for n in nomes:
    t = FEITOS[n]
    for y in range(t.h):
        for x in range(t.w):
            c = t.px[y][x]
            if c == T: continue
            for dy in range(ESC):
                for dx in range(ESC):
                    yy = PAD + y*ESC + dy; xx = x_off + x*ESC + dx
                    if c[3] == 255: folha[yy][xx] = c
                    else:
                        f = folha[yy][xx]; a = c[3]/255
                        folha[yy][xx] = (int(c[0]*a+f[0]*(1-a)), int(c[1]*a+f[1]*(1-a)), int(c[2]*a+f[2]*(1-a)), 255)
    x_off += t.w*ESC + PAD
salvar_png('saida/_ficha.png', W_TOTAL, H_TOTAL, folha)
print("gerados:", ", ".join(nomes))
