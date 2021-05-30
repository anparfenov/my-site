---
title: Настройка вима для веб разработки.
description: Разбираю свой конфиг вима.
date: 2021-05-19
tags:
  - вим
  - редакторы
layout: layouts/post.njk
---

## Вступление

Я использую вим уже более 3 лет и за это время успел повозится со своим конфигом. В этой статье я расскажу об установленных плагинах и некоторых настройках.

## Менеджер плагинов

Я использую [vim-plug](https://github.com/junegunn/vim-plug)

Установка и настройка очень простая и у меня ни разу не было с ним проблем.

```vim
" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged' Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.config/nvim/plugged/')

" Plugins...

" Initialize plugin system
call plug#end()
```
Между вызовами `plug#begin()` и `plug#end()` прописываем нужные плагины как

`Plug 'plugin/repo'`

## Плагины для автодополнения и линтинга

Для автодополнения, функций ide и lsp я использую старый добрый [YouCompleteMe](https://github.com/ycm-core/YouCompleteMe). Меня в нем пока все устраивает.

```vim
Plug 'ycm-core/YouCompleteMe'
```
<video autoplay loop muted>
    <source src="/static/videos/vim-setup/ycm.webm" type="video/webm">
    <source src="/static/videos/vim-setup/ycm.mp4" type="video/mp4">
</video>

[ultisnips](https://github.com/sirver/UltiSnips) - Плагин для управления сниппетами.
[vim-snippets](https://github.com/honza/vim-snippets) - Сами сниппеты.

```vim
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'
```
<video autoplay loop muted>
    <source src="/static/videos/vim-setup/snippets.webm" type="video/webm">
    <source src="/static/videos/vim-setup/snippets.mp4" type="video/mp4">
</video>

Это чтобы сниппет триггернулся

```vim
let g:UltiSnipsExpandTrigger = '<C-k>'
```

Для линтинга и форматирования кода использую [ale](https://github.com/dense-analysis/ale). Работает нормально. Можно настроить список линтеров под каждый язык.

### Альтернитивы

- [coc.nvim](https://github.com/neoclide/coc.nvim). Прост в установке, плагины от `vscode`, но кушает довольно много ресурсов и на не очень производительных машинах может быть не комфортно.

- [LanguageClient-neovim](https://github.com/autozimu/LanguageClient-neovim). Клиент для lsp. Устанавливать lsp серверы нужно отдельно и прописывать их в конфиге. Бывали проблемы с конфигурацией. Например, с изменением отображения ошибок клиент сильно лагал. Перестал пользоваться потому что начались сильные лаги непонятно из-за чего. Было лень разбираться и я вернулся на `ycm`


## Плагины для языков

```vim
Plug 'dag/vim-fish'
Plug 'pangloss/vim-javascript'
Plug 'maxmellon/vim-jsx-pretty'
Plug 'leafgarland/typescript-vim'
Plug 'evanleck/vim-svelte'
Plug 'othree/html5.vim'
Plug 'amadeus/vim-mjml'
Plug 'wlangstroth/vim-racket'
Plug 'leafOfTree/vim-vue-plugin'
Plug 'neovimhaskell/haskell-vim'
Plug 'elixir-editors/vim-elixir'
Plug 'iamcco/markdown-preview.nvim', { 'do': 'cd app & yarn install'  }
Plug 'mattn/emmet-vim'
Plug 'cespare/vim-toml'
Plug 'jonsmithers/vim-html-template-literals'
Plug 'mustache/vim-mustache-handlebars'
Plug 'lepture/vim-jinja'
Plug 'uki00a/vim-deno'
Plug 'isobit/vim-caddyfile'
Plug 'Olical/conjure', {'tag': 'v4.13.0'}
Plug 'rust-lang/rust.vim'
Plug 'ziglang/zig.vim'
Plug 'lervag/vimtex'
```

## Плагины для перемещения, редактирования

Для быстрого, эффективного и эффектного перемещения
есть плагин [easymotion](https://github.com/easymotion/vim-easymotion)

<video autoplay loop muted>
    <source src="/static/videos/easymotion.webm" type="video/webm">
    <source src="/static/videos/easymotion.mp4" type="video/mp4">
</video>
(Пытался заставить работать программу для отображения нажатых клавиш на wayland, но не смог)

Плагин выделяет все возможные варианты перемещения и перемещает к набранное комбинации клавиш.

Я если честно не часто им пользуюсь. Но иногда прикольно его задействовыть.
Со стороны думаю прикольно выглядит.

Для редактирования скобок и ковычек я использую [vim-surround](https://github.com/tpope/vim-surround). Мега полезный плагин, постоянно использую

Для быстрого обрамления в кавычки добавил эту переменную

```vim
let g:AutoPairsShortcutFastWrap='<C-e>'
```

#### Автоскобки

```vim
Plug 'jiangmiao/auto-pairs'
```

#### Комментирование.

Плагин [tcomment](https://github.com/tomtom/tcomment_vim) лучше всего с этим справляется.

```vim
Plug 'tomtom/tcomment_vim'
```
<video autoplay loop muted>
    <source src="/static/videos/vim-setup/tcomment.webm" type="video/webm">
    <source src="/static/videos/vim-setup/tcomment.mp4" type="video/mp4">
</video>

## Плагины для гита

[fugitive](https://github.com/tpope/vim-fugitive) - обертка над `git`. Пользуюсь им не так часто, почему-то все время тянет в консоль. Хотя этот плагин делает тоже самое что и гит в консоли.

<video autoplay loop muted>
    <source src="/static/videos/vim-setup/git.webm" type="video/webm">
    <source src="/static/videos/vim-setup/git.mp4" type="video/mp4">
</video>

[gitgutter](https://github.com/airblade/vim-gitgutter) - Подсвечивает изменения в боковой колонке.

Для просмотра дифов есть такая комманда

```vim
:Gdiffsplit <commit_hash>
```

## Плагины для файлового дерева

У меня установлен [fern](https://github.com/lambdalisue/fern.vim)

Не знаю чем он лучше `nerdtree`, но я решил попробовать поставить и вроде норм.

Ему нужна конфигурация, потому что из коробки ничего не работает.

```vim
function! s:init_fern() abort
  " Define NERDTree like mappings
  nmap <buffer> o <Plug>(fern-action-open:edit)
  nmap <buffer> go <Plug>(fern-action-open:edit)<C-w>p
  nmap <buffer> t <Plug>(fern-action-open:tabedit)
  nmap <buffer> T <Plug>(fern-action-open:tabedit)gT
  nmap <buffer> i <Plug>(fern-action-open:split)
  nmap <buffer> gi <Plug>(fern-action-open:split)<C-w>p
  nmap <buffer> s <Plug>(fern-action-open:vsplit)
  nmap <buffer> gs <Plug>(fern-action-open:vsplit)<C-w>p
  nmap <buffer> ma <Plug>(fern-action-new-path)
  nmap <buffer> d <Plug>(fern-action-remove)
  nmap <buffer> P gg

  nmap <buffer> C <Plug>(fern-action-enter)
  nmap <buffer> u <Plug>(fern-action-leave)
  nmap <buffer> r <Plug>(fern-action-reload)
  nmap <buffer> R gg<Plug>(fern-action-reload)<C-o>
  nmap <buffer> cd <Plug>(fern-action-cd)
  nmap <buffer> CD gg<Plug>(fern-action-cd)<C-o>

  nmap <buffer> I <Plug>(fern-action-hide-toggle)

  nmap <buffer> q :<C-u>quit<CR>

  nmap <buffer><expr>
      \ <Plug>(fern-my-expand-or-collapse)
      \ fern#smart#leaf(
      \   "\<Plug>(fern-action-collapse)",
      \   "\<Plug>(fern-action-expand)",
      \   "\<Plug>(fern-action-collapse)",
      \ )

  nmap <buffer><nowait> l <Plug>(fern-my-expand-or-collapse)
endfunction

augroup fern-custom
  autocmd! *
  autocmd FileType fern call s:init_fern()
augroup END

" opens fern
map <C-n> :Fern . -drawer<CR>
```

### Альтернитивы

[nerdtree](https://github.com/preservim/nerdtree). Пользовался им до `fern` свои функции выполняет хорошо. Проблем с ним не припомню.

## Поиск

Для поиска файлов поставил [fzf](https://github.com/junegunn/fzf.vim)

<video autoplay loop muted>
    <source src="/static/videos/vim-setup/fzf.webm" type="video/webm">
    <source src="/static/videos/vim-setup/fzf.mp4" type="video/mp4">
</video>

Для поиска по словам [vim-grepper](https://github.com/mhinz/vim-grepper)

<video autoplay loop muted>
    <source src="/static/videos/vim-setup/grepper.webm" type="video/webm">
    <source src="/static/videos/vim-setup/grepper.mp4" type="video/mp4">
</video>

Вместе с ним еще можно поставить программу для поиска. Я поставил [ag](https://github.com/ggreer/the_silver_searcher). Он быстрый. Может есть быстрее, но этого хватает.

## Разные штуки

[startify](https://github.com/mhinz/vim-startify) - Стартовый экран с недавними файлами и цитаткой от великих людей.

[FixCursorHold](https://github.com/antoinemadec/FixCursorHold.nvim) - фикс для производительности. Не знаю что он делает и сделал ли производительность лучше, но я на всякий поставил.

Управление отступами в визуальном режиме.

```vim
xnoremap < <gv
xnoremap > >gv
vnoremap // y/\V<C-R>=escape(@",'/\')<CR><CR>
```

## Заключение

Из вима, благодоря куче плагинов и возможностям lsp, можно сделать vs code, который не лагает, не жрет кучу ресурсов и нормально открывает большие файлы.
