#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI -> new;
print $q->header('text/xml;charset=UTF-8');y

sub CheckClient {

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT title FROM Articles WHERE owner=?";
  my $sth = $dbh->prepare($sql);
}
